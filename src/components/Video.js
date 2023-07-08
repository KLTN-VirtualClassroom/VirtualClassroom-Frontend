import { JitsiMeeting } from "@jitsi/react-sdk";
import config from "../config/config";

import React, { useEffect, useState, forwardRef, useRef } from "react";
import { memo } from "react";

const Videocall = forwardRef((props, ref) => {
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const getVideo = () => {
      const domain = config.path.VIDEO_PATH;
      const options = {
        roomName: props.id,
        height: "100%",
        configOverwrite: {
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          enableEmailInStats: false,
          disableSimulcast: false,
        },
        interfaceConfigOverwrite: {
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false,
        },
        userInfo: {
          displayName: props.name,
          email: "null",
        },
        parentNode: document.getElementById("call-meet"),
      };
      console.log("IFAMMA");
      const api = new window.JitsiMeetExternalAPI(domain, options);
    };

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getVideo();
  }, []);

  // const CallPage = `
  // <div
  //     id="meet"
  //     allow="camera; microphone; fullscreen; display-capture; autoplay"
  //   ></div>
  //   <script src="${config.path.VIDEO_PATH}/external_api.js"></script>

  //   <script>
  //     const domain = ${config.path.VIDEO_PATH};
  //     const options = {
  //       roomName: ${props.id},
  //       height: "100%",
  //       configOverwrite: {
  //         startWithAudioMuted: true,
  //         disableModeratorIndicator: true,
  //         enableEmailInStats: false,
  //         disableSimulcast: false,
  //       },
  //       interfaceConfigOverwrite: {
  //         DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
  //         filmStripOnly: false,
  //         SHOW_JITSI_WATERMARK: false,
  //       },
  //       userInfo: {
  //         displayName: ${props.name},
  //         email: "null",
  //       },
  //       parentNode: document.getElementById("meet"),
  //     };
  //     const api = new JitsiMeetExternalAPI(domain, options);
  //     console.log("Da khoi dong)
  //   </script>
  // `;

  return <div id="call-meet" style={{ height: "100%" }}></div>;
});

export default memo(Videocall);
