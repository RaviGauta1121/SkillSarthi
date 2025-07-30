"use client"
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="mt-16">
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="mt-16">
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
