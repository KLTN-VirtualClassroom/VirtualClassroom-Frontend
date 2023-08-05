import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import config from "../config/config";
import ImageTransfer from "../statics/transfer.png";
import Link from "@mui/material/Link";

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
      .get(
        `${config.path.REDIRECT_PATH}/schedule_event?email=${props.userInfo.email}`
      )
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
      // <Box
      //   display={"flex"}
      //   alignItems={"center"}
      //   flexDirection={"column"}
      //   flexWrap={"wrap"}
      //   gap={5}
      //   mt={15}
      //   mx={5}
      // >
      //   <Box
      //     component="img"
      //     sx={{
      //       height: 233,
      //       width: 550,
      //       maxHeight: { xs: 233, md: 167 },
      //       maxWidth: { xs: 550, md: 450 },
      //     }}
      //     alt="The house from the offer."
      //     src={ImageTransfer}
      //   />
      //   <Box
      //     // display={"flex"}
      //     // justifyContent={"center"}
      //     // mt={30}
      //     // mr={1}
      //     // ml={1}
      //     sx={{ fontWeight: "bold", fontSize: 20 }}
      //   >
      //     Room has been redirected to a new Google Meet with this link: &nbsp;
      //     <a href={linkGgMeeting} target="_blank" rel="noopener noreferrer">
      //       Click here
      //     </a>
      //   </Box>
      //   {props.role === "teacher" && (
      //     <Box
      //       // display={"flex"}
      //       // justifyContent={"center"}
      //       // mt={5}
      //       // mr={1}
      //       // ml={1}
      //       sx={{ fontWeight: "bold", fontSize: 20 }}
      //     >
      //       Return Meeting Call: &nbsp;
      //       <Link
      //         component="a"
      //         variant="body"
      //         onClick={props.returnMeeting}
      //         sx={{ cursor: "pointer" }}
      //       >
      //         Click here
      //       </Link>
      //       {/* <Button onClick={props.returnMeeting}>
      //       Click here
      //     </Button> */}
      //     </Box>
      //   )}
      // </Box>
      <Box display={"flex"} justifyContent={"center"} mt={15} mx={5}>
        {/* <Button
            sx={{ fontWeight: "bold", fontSize: 20 }}
            onClick={handleClickOpen}
          >
            Tạo Google Meet mới
          </Button> */}
        <Card
          sx={{
            maxWidth: 650,
            border: "none",
            boxShadow: "none",
            bgcolor: "transparent",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={ImageTransfer}
            sx={{ maxWidth: "60%", margin: "auto" }}
            alt="lettutor to google meet"
          />
          <CardContent sx={{ marginTop: "10px" }}>
            {props.role === "teacher" ? (
              <>
                <Box sx={{ fontWeight: 500, fontSize: 20 }}>
                  Room has been redirected to Google Meet: &nbsp;
                  <Link
                    component="a"
                    variant="body"
                    onClick={() => window.open(linkGgMeeting, "_blank")}
                    sx={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    Click here
                  </Link>
                </Box>
                <Box
                  // display={"flex"}
                  // justifyContent={"center"}
                  mt={5}
                  // mr={1}
                  // ml={1}
                  sx={{ fontWeight: 500, fontSize: 20 }}
                >
                  Return Meeting Call: &nbsp;
                  <Link
                    component="a"
                    variant="body"
                    onClick={props.returnMeeting}
                    sx={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    Click here
                  </Link>
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ fontWeight: 500, fontSize: 20 }}>
                  Teacher has stopped this video call.
                </Box>
                <Box mt={5} sx={{ fontWeight: 500, fontSize: 20 }}>
                Please redirect to Google Meet through this link: &nbsp;
                  <Link
                    component="a"
                    variant="body"
                    onClick={() => window.open(linkGgMeeting, "_blank")}
                    sx={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    Click here
                  </Link>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  else
    return (
      <div>
        <Box display={"flex"} justifyContent={"center"} mt={15} mx={5}>
          {/* <Button
            sx={{ fontWeight: "bold", fontSize: 20 }}
            onClick={handleClickOpen}
          >
            Tạo Google Meet mới
          </Button> */}
          <Card
            sx={{
              maxWidth: 650,
              border: "none",
              boxShadow: "none",
              bgcolor: "transparent",
            }}
          >
            <CardMedia
              component="img"
              height="130"
              image={ImageTransfer}
              bgcolor="transparent"
              sx={{ maxWidth: "60%", margin: "auto" }}
              alt="lettutor to google meet"
            />
            <CardContent sx={{ marginTop: "10px", marginLeft: "0px" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ margin: "auto", width: "32%" }}
              >
                Redirect Meeting
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mt={3}
                ml={0}
                fontSize={18}
              >
                <ul>
                  <li>
                    Create <b> new Google Meet room </b> and stop video
                    activities in this screen.
                  </li>
                  <li>
                    <b>Material</b> and <b>Chat</b> are still able to be used
                    during the video call delaying.
                  </li>
                  <li>
                    Can be resume video call of this page after redirecting.
                  </li>
                </ul>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                fontSize="20"
                sx={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  margin: "auto",
                  width: "50%",
                  textTransform: "none",
                }}
                onClick={handleClickOpen}
              >
                Create new Google Meet
              </Button>
            </CardActions>
          </Card>
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Redirect to Google Meet"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to create new Google Meet link?.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleChangeMeeting} autoFocus>
              Redirect
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

export default WhiteboardScreen;
