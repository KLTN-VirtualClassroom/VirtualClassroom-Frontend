import { JitsiMeeting } from "@jitsi/react-sdk";
import config from '../config/config';

import React, { useEffect, useState, forwardRef } from "react";
import { memo } from "react";
import { motion as m } from "framer-motion";


const Videocall = forwardRef((props,ref) => {
  const [name, setName] = useState("");
  

  return (
    <>
      <JitsiMeeting
        domain = {config.path.VIDEO_PATH}
        // domain = "meet.jit.si"
        roomName={props.id}
        
        configOverwrite={{
          startWithAudioMuted: true,
          prejoinPageEnabled: true,
          // conference: {
          //   _room: {
          //     isJoined: function() {
          //       return true;
          //     }
          //   }
          // },
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
          disableSimulcast: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false,
        }}
        userInfo={{
          displayName: props.name,
          email: "null",
        }}
        onApiReady={(externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
          // externalApi.addEventListener(
          //   "participantRoleChanged",
          //   function (event) {
          //     if (event.role === "moderator") {
          //       externalApi.executeCommand("password", "12345678");
          //     }
          //   }
          // );
          // externalApi.on("passwordRequired", function () {
          //   externalApi.executeCommand("password", "12345678");
          // });
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100%";
        }}
      />
    </>
  );
});

export default memo(Videocall);
