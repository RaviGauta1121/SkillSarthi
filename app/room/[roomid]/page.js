"use client";

import useUser from "@/hooks/useUser";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

const Room = ({ params }) => {
  const { fullName } = useUser();
  const roomID = params.roomid;
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const startMeeting = async () => {
      try {
        if (containerRef.current) {
          // Generate Kit Token
          const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
          const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
          console.log(appID);
          console.log(serverSecret);

          if (!appID || !serverSecret) {
            throw new Error("Missing Zego App ID or Server Secret.");
          }

          const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            uuid(),
            fullName || "user" + Date.now(),
            720
          );

          console.log("Kit Token:", kitToken);

          // Create instance object from Kit Token.
          const zp = ZegoUIKitPrebuilt.create(kitToken);

          if (zp && typeof zp.joinRoom === "function") {
            // Start the call
            zp.joinRoom({
              container: containerRef.current,
              sharedLinks: [
                {
                  name: "Shareable link",
                  url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
                },
              ],
              scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
              },
              maxUsers: 10,
            });
          } else {
            throw new Error(
              "Failed to create ZegoUIKitPrebuilt instance or joinRoom is not a function."
            );
          }
        }
      } catch (err) {
        console.error("Error starting meeting:", err);
        setError(err.message);
      }
    };

    startMeeting();
  }, [fullName, roomID]);

  return (
    <div className="w-full h-screen bg-gray-950">
      <div ref={containerRef} className="w-full h-full"></div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default Room;
