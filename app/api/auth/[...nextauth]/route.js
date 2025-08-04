import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/lib/mongodb";
import UserModel from "@/models/User";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectMongoDB();
          console.log('✅ Database connected for credential auth');
          
          const user = await UserModel.findOne({ email: credentials.email }).exec();
          
          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(`🔐 Sign-in attempt with ${account.provider}`);
      console.log('👤 User object:', JSON.stringify(user, null, 2));
      console.log('📋 Profile object:', JSON.stringify(profile, null, 2));
      
      // Handle social sign-ins (Google, GitHub)
      if (account.provider === "google" || account.provider === "github") {
        try {
          await connectMongoDB();
          console.log('✅ Database connected for social auth');
          
          // For GitHub, try to get email from profile if not in user
          let userEmail = user.email;
          if (!userEmail && profile) {
            userEmail = profile.email;
          }
          
          // If still no email, try to get primary email from GitHub API
          if (!userEmail && account.provider === "github" && account.access_token) {
            try {
              const emailResponse = await fetch('https://api.github.com/user/emails', {
                headers: {
                  'Authorization': `token ${account.access_token}`,
                  'User-Agent': 'SkillSarthi-App'
                }
              });
              
              if (emailResponse.ok) {
                const emails = await emailResponse.json();
                const primaryEmail = emails.find(email => email.primary && email.verified);
                if (primaryEmail) {
                  userEmail = primaryEmail.email;
                  console.log('✅ Retrieved primary email from GitHub API:', userEmail);
                }
              }
            } catch (emailError) {
              console.error('❌ Error fetching GitHub emails:', emailError);
            }
          }
          
          // If we still don't have an email, create one based on the username/ID
          if (!userEmail) {
            const username = profile?.login || profile?.username || `user${account.providerAccountId}`;
            userEmail = `${username}@${account.provider}.local`;
            console.log('⚠️ No email found, using generated email:', userEmail);
          }
          
          console.log('📧 Final email for processing:', userEmail);
          
          // Check if user already exists
          let existingUser = await UserModel.findOne({ 
            $or: [
              { email: userEmail },
              { providerId: account.providerAccountId, provider: account.provider }
            ]
          }).exec();
          
          if (existingUser) {
            console.log('✅ Existing social user found:', existingUser.email);
            
            // Update existing user with latest info if needed
            if (existingUser.provider !== account.provider || 
                existingUser.providerId !== account.providerAccountId) {
              await UserModel.findByIdAndUpdate(existingUser._id, {
                provider: account.provider,
                providerId: account.providerAccountId,
                image: user.image,
                name: user.name,
              });
              console.log('✅ Updated existing user info');
            }
            
            // Store user ID for session
            user.id = existingUser._id.toString();
            return true;
          }
          
          // Create new user for social sign-in
          const userName = user.name || profile?.name || profile?.login || profile?.username || userEmail.split('@')[0];
          const newUser = await UserModel.create({
            name: userName,
            firstName: userName.split(' ')[0],
            lastName: userName.split(' ').slice(1).join(' ') || '',
            email: userEmail,
            image: user.image,
            provider: account.provider,
            providerId: account.providerAccountId,
            emailVerified: userEmail.includes('.local') ? null : new Date(), // Only verify real emails
          });
          
          console.log('✅ New social user created:', newUser._id);
          
          // Store user ID for session
          user.id = newUser._id.toString();
          return true;
          
        } catch (error) {
          console.error(`❌ Error handling ${account.provider} sign-in:`, error);
          
          // Handle duplicate key error gracefully
          if (error.code === 11000) {
            console.log('🔄 Duplicate user detected, attempting to find existing user');
            try {
              const existingUser = await UserModel.findOne({ 
                providerId: account.providerAccountId, 
                provider: account.provider 
              }).exec();
              if (existingUser) {
                user.id = existingUser._id.toString();
                return true;
              }
            } catch (findError) {
              console.error('❌ Error finding existing user:', findError);
            }
          }
          
          // Allow sign-in to continue even if database operation fails
          // The user will still be authenticated via JWT
          console.log('⚠️ Allowing sign-in despite database error');
          return true;
        }
      }
      
      // Handle credentials sign-in normally
      if (account.provider === "credentials") {
        return true;
      }
      
      return true;
    },
    
    async jwt({ token, user, account }) {
      // If this is the first time the JWT is being created (user exists)
      if (user) {
        // For social logins, we need to ensure we have the MongoDB ObjectId, not the provider ID
        if (account && (account.provider === "google" || account.provider === "github")) {
          try {
            await connectMongoDB();
            const dbUser = await UserModel.findOne({ 
              email: user.email,
              provider: account.provider 
            }).exec();
            
            if (dbUser) {
              token.id = dbUser._id.toString();
              console.log('✅ JWT token set with MongoDB ObjectId:', token.id);
            } else {
              console.log('⚠️ User not found in database for JWT token');
              token.id = user.id; // Fallback to original ID
            }
          } catch (error) {
            console.error('❌ Error fetching user in JWT callback:', error);
            token.id = user.id; // Fallback to original ID
          }
        } else {
          // For credentials login, user.id is already the MongoDB ObjectId
          token.id = user.id;
        }
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = token.id;
        
        // Validate that the token.id is a valid MongoDB ObjectId before querying
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(token.id)) {
          console.log('⚠️ Invalid ObjectId in token, skipping database query:', token.id);
          return session;
        }
        
        // Optionally, fetch fresh user data from database
        try {
          await connectMongoDB();
          const dbUser = await UserModel.findOne({ _id: token.id }).select('-password').exec();
          
          if (dbUser) {
            session.user = {
              ...session.user,
              id: dbUser._id.toString(),
              name: dbUser.name,
              email: dbUser.email,
              image: dbUser.image,
              provider: dbUser.provider,
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
            };
            console.log('✅ Session updated with database user data');
          } else {
            console.log('⚠️ User not found in database for session');
          }
        } catch (error) {
          console.error('❌ Error fetching user in session callback:', error);
        }
      }
      
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };