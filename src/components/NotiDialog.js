
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button} from "@mui/material";

import { memo } from "react";

const NotiDialog = (props) => {
return (
    <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Redirect to Google Meet"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your room has been redirect to another Google Meet. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>Cancel</Button>
            <Button onClick={props.handleChangeMeeting} autoFocus>
              Redirect
            </Button>
          </DialogActions>
        </Dialog>
)
}
export default memo(NotiDialog)