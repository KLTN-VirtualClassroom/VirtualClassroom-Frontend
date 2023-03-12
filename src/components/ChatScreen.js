import { useEffect, useState } from "react";
import config from '../config/config';
import "../Style/ChatScreen.css";

const ChatScreen = (props) => {
  const account = props.userInfo;
  //const chatLink = `http://115.78.232.219:3122/channel/${props.userInfo.roomId}?layout=embedded`
  //const chatLink = `http://localhost:3000/channel/${props.userInfo.roomId}?layout=embedded`
  const chatLink = `${config.path.CHAT_PATH}/channel/general?layout=embedded`

  console.log("Link: "+ chatLink)
  const [authToken, setauthToken] = useState("");

  const [position, setPosition] = useState({
    left: "0px",
    top: "0px",
    position: "relative",
  });

  // const handleClick = () => {
  //   setPosition({
  //     left: "100px",
  //     top: "100px",
  //     position: "relative",
  //   });
  // };

  return (
    <>
      <iframe
      title="chat"
      // src="http://localhost:3000/channel/general?layout=embedded"
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
