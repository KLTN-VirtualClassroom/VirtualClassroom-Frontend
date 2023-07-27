import { JitsiMeeting } from "@jitsi/react-sdk";
import config from "../config/config";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

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

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      {props.pdfId ? (
        props.screen === "" ? (
          <Box
            sx={{
              position: "absolute",
              left: "5px",
              top: "1vh",
              opacity: "0.3",
              "&:hover": {
                opacity: "0.6",
              },
            }}
          >
            <Fab size="small" onClick={props.toMaterial}>
              <ZoomInMapIcon />
            </Fab>
          </Box>
        ) : (
          <Box
            sx={{
              position: "absolute",
              right: "5px",
              top: "1vh",
              opacity: "0.3",
              "&:hover": {
                opacity: "0.6",
              },
            }}
          >
            <Fab size="small" onClick={props.toFullVideo}>
              <ZoomOutMapIcon />
            </Fab>
          </Box>
        )
      ) : (
        props.screen !== "" && (
          <Box
            sx={{
              position: "absolute",
              right: "5px",
              top: "1vh",
              opacity: "0.3",
              "&:hover": {
                opacity: "0.6",
              },
            }}
          >
            <Fab size="small" onClick={props.toFullVideo}>
              <ZoomOutMapIcon />
            </Fab>
          </Box>
        )
      )}
      <div id="call-meet" style={{ height: "100%" }}></div>
    </Box>
  );
});

export default memo(Videocall);
