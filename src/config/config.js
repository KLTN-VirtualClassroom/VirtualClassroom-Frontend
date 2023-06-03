const config = {
  path: {
    SERVER_PATH: process.env.REACT_APP_SERVER_PATH,
    PSPDFKIT_UI_PATH: process.env.REACT_APP_PSPDFKIT_UI_PATH,
    PSPDFKIT_SERVER: process.env.REACT_APP_PSPDFKIT_SERVER,
    CHAT_PATH: process.env.REACT_APP_CHAT_PATH,
    VIDEO_PATH: process.env.REACT_APP_VIDEO_PATH,
    SOCKET_PATH: process.env.REACT_APP_SOCKET_PATH,
    REDIRECT_PATH: process.env.REACT_APP_REDIRECT_PATH
  },
  auth: {
    CHAT_PASS: process.env.CHAT_PASS,
    VIDEO_PASS: process.env.VIDEO_PASS
  }
};

export default config;
