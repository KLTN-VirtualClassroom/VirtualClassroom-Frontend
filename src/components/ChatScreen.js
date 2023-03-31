import { useEffect, useState } from "react";
import config from '../config/config';
import "../Style/ChatScreen.css";

const ChatScreen = (props) => {
  const account = props.userInfo;
  const chatLink = `${config.path.CHAT_PATH}/channel/${account.roomId}?layout=embedded`

  console.log("Link: "+ chatLink)
  const [authToken, setauthToken] = useState("");

  const [position, setPosition] = useState({
    left: "0px",
    top: "0px",
    position: "relative",
  });



  return (
    <>
      <iframe
      title="chat"
      src={chatLink}
        style={{
          left: position.left,
          top: position.top,
          position: position.position,
          height: "100%"
        }}
      />
    </>
  );
};
export default ChatScreen;
