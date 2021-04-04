import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { useSelector, useDispatch } from "react-redux";
import Badge from "@material-ui/core/Badge";

import "./header.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { isLoggedIn = false, userId } = props.loginStatus;
  const cartDetails = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrdersNav = () => {
    setAnchorEl(null);
    props.navigateToOrders();
  };

  const handleLogout = () => {
    setAnchorEl(null);
    props.logOut();
  }


  const userDetailsMarkUp = () => {
    const user = props.users.filter((val) => val.userId === userId)[0];
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
      <div className="user_details">
        <div>Hello {user.name}</div>
        <div>
          <Avatar
            alt={user.name}
            src={user.url}
            onClick={(event) => handleClick(event)}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button onClick={() => handleOrdersNav()}>
                <ListItemText primary="Your Orders"/>
              </ListItem>
              <ListItem button onClick={() => handleLogout()}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Popover>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
          <Badge
            color="secondary"
            badgeContent={cartDetails.cartItems.length}
            showZero
            onClick={() => props.navigateToCart()}
          >
            <ShoppingCartIcon />
          </Badge>
          {!isLoggedIn && (
            <Button color="inherit" onClick={() => props.toggleLogin()}>
              Login
            </Button>
          )}
          {isLoggedIn && userDetailsMarkUp()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
