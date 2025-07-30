"use client";

import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { getSession } from "next-auth/react"; // Adjust import based on your session management
import Link from "next/link"; // Required for logout link

export default function Home() {
  const { fullName, setFullName } = useUser(); // Custom hook to manage user state
  const [roomID, setRoomID] = useState("");
  const [user, setUser] = useState(null); // State to store the user session
  const router = useRouter();
  
  useEffect(() => {
    async function fetchSession() {
      const session = await getSession(); // Fetch session details (adjust based on your session management)
      if (session) {
        // Extract user details from session
        const { user } = session;
        setUser(user); // Set user details in state
        const name = user.name || user.email.split("@")[0]; // Use name or extract from email
        setFullName(name); // Set the user's name
      }
    }
    fetchSession();
  }, [setFullName]);

  return (
    <div className="w-full h-screen">
      <section className="bg-gray-950 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 flex-col gap-24 flex h-screen items-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent text-5xl pb-5">
              {`Have a smooth meeting`}
            </h1>
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent text-5xl">
              <span className="block">with Friends...</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl sm:text-xl/relaxed">
              Connect With Some New Enthusiastic Developers
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <input
                type="text"
                id="name"
                onChange={(e) => setFullName(e.target.value)} // Allow user to change name
                value={fullName || ""} // Automatically fill the input if user is logged in
                className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
                placeholder="Enter your name"
                autoComplete="off"
                disabled={!!user} // Disable the input field if user is logged in
              />
            </div>

            {/* If the user is logged in or the name is at least 3 characters long */}
            {user || (fullName && fullName.length >= 3) ? (
              <>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <input
                    type="text"
                    id="roomid"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)} // Update room ID
                    className="border rounded-md focus:border-transparent focus:outline-none focus:ring-0 px-4 py-2 w-full text-black"
                    placeholder="Enter room ID to join a meeting"
                    autoComplete="off"
                  />
                  <button
                    className="rounded-md bg-blue-600 px-10 py-[11px] text-sm font-medium text-white focus:outline-none sm:w-auto"
                    onClick={() => router.push(`/room/${roomID}`)} // Navigate to room based on room ID
                    disabled={!roomID} // Disable button if no room ID
                  >
                    Join
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <button
                    className="text-lg font-medium hover:text-blue-400 hover:underline"
                    onClick={() => router.push(`/room/${uuid()}`)} // Create a new room with a unique ID
                  >
                    Or create a new meeting
                  </button>
                </div>
              </>
            ) : null}

            {/* If the user is logged in, display the user's profile picture and a log out button */}
            {user ? (
              <div className="flex items-center justify-center gap-4 mt-6">
                {/* Display user's profile picture */}
                <img
                  src={user.image}
                  alt={`${user.name}'s profile picture`}
                  className="w-8 h-8 rounded-full"
                />
                {/* Log out button */}
                <Link href="/api/auth/logout">
                  <button className="text-white bg-red-600 px-4 py-2 rounded-full">
                    Log Out
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
