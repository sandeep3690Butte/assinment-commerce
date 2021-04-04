import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";

import "./login.scss";

export default function LoginDialog(props) {
  const [formValues, setFormValues] = React.useState({
    name: "",
    password: "",
  });
  const [error, setError] = React.useState({});

  const handleOnChange = (event) => {
    const { value, name } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSignIn = () => {
    const { handleLogin } = props;
    let formErrors = {};
    Object.keys(formValues).map((data) => {
      if (!formValues[data] || formValues[data] === "") {
        formErrors = {
          ...formErrors,
          [data]: true,
          hasError: true,
          [`${data}-helper-text`]: `Enter valid ${data}`,
        };
      }
    });
    if (formErrors.hasError) {
      setError(formErrors);
      return;
    } else {
      handleLogin(formValues);
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="login_header">
            <div>Login to continue</div>
            <div onClick={() => props.toggleLogin()}>
              <CancelIcon className="closeIcon" />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.loginError.hasError && (
              <div
                className="error-message"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  color: "red",
                }}
              >
                <div className="error-icon">
                  <ErrorIcon color="red" />
                </div>
                <div>{props.loginError.message}</div>
              </div>
            )}
            <div>
              <TextField
                error={error.name}
                helperText={error["name-helper-text"]}
                label="userName"
                name="name"
                onChange={(event) => handleOnChange(event)}
              />
            </div>
            <div>
              <TextField
                error={error.password}
                helperText={error["password-helper-text"]}
                type="password"
                label="password"
                name="password"
                onChange={(event) => handleOnChange(event)}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleSignIn()}>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
