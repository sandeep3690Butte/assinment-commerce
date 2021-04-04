import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {useDispatch} from "react-redux";

import {emptyCart} from "../../actions/cart";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SuccessSnackBar(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
 
  const handleClose = () => {
    dispatch(emptyCart());
    props.history.push("/");
  };

  return (
    <div className={classes.root}>
      <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
         Order placed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
