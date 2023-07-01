import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import config from "../config/config";

const WhiteboardScreen = (props) => {
  const [open, setOpen] = React.useState(false);
  const [linkGgMeeting, setLinkGgMeeting] = React.useState(
    props.linkNewMeeting
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(props.userInfo.email);
  const handleChangeMeeting = () => {
    axios
      .get(`${config.path.REDIRECT_PATH}/schedule_event?email=${props.userInfo.email}`)
      .then((response) => {
        // console.log(response.data);
        const linkMeeting = response.data.msg;
        window.open(linkMeeting);
        setLinkGgMeeting(linkMeeting);
        setOpen(false);
        props.redirectMeeting(linkMeeting);
      });
  };

  if (linkGgMeeting)
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        mt={30}
        sx={{ fontWeight: "bold", fontSize: 20 }}
      >
        Room đã được chuyển hướng đến trang Google Meet khác với đường dẫn:
        &nbsp;
        <a href={linkGgMeeting} target="_blank" rel="noopener noreferrer">
          Click here
        </a>
      </Box>
    );
  else
    return (
      <div>
        <Box display={"flex"} justifyContent={"center"} mt={30}>
          <Button
            sx={{ fontWeight: "bold", fontSize: 20 }}
            onClick={handleClickOpen}
          >
            Tạo Google Meet mới
          </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Chuyển hướng Google Meet"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có chắc muốn chuyển hướng sang trang Google Meet mới? Mọi hoạt
              động ở trang này sẽ bị tạm ngừng.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleChangeMeeting} autoFocus>
              Chuyển hướng
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

export default WhiteboardScreen;
