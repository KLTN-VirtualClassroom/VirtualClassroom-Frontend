import { forwardRef, useState } from "react";
import { memo } from "react";

import config from "../config/config";
import "../Style/ChatScreen.css";
import { motion as m } from "framer-motion";

const ChatScreen = forwardRef((props, ref) => {
  const account = props.userInfo;

  const chatLink = `${config.path.CHAT_PATH}/channel/${account.roomId}?layout=embedded&resumeToken=${account.authToken}`;
  console.log("Link: " + chatLink);

  const [position, setPosition] = useState({
    left: "0px",
    top: "0px",
    position: "relative",
  });

  return (
    <>
      <m.iframe
        ref={ref}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        exit={{ opacity: 0.5 }}
        title="chat"
        src={chatLink}
        style={{
          left: position.left,
          top: position.top,
          position: position.position,
          height: "100%",
        }}
      />
    </>
  );
});
export default memo(ChatScreen);
