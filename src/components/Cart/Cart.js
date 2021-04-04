import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import HomeIcon from "@material-ui/icons/Home";

import { addToCart, removeProduct } from "../../actions/cart";
import data from "../../data/products.json";
import CardHeader from "@material-ui/core/CardHeader";
import SuccessSnackBar from "../orderSuccess/SuccessSnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "10px",
    position: "relative",
    top: "60px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "15px",
    borderBottom: "1px solid #dbd5d5",
    boxShadow: "-2px 0px 6px 2px;",
  },
  cardroot: {
    maxWidth: 800,
    display: "flex",
  },
  media: {
    height: 140,
  },
  category: {
    display: "flex",
    flexDirection: "Column",
    margin: "20px 20px",
  },
  products: {
    display: "flex",
  },
  qtyContainer: {
    display: "flex",
    alignItems: "center",
    background: "#cec3c8",
  },
  placeorder: {
    margin: "20px 0",
    background: "#cec3c8",
    width: "100%",
    "&:hover": {
      background: "#e4d7dd",
    },
  },
  removeBtn: {
    background: "#cec3c8",
    margin: "10px 0",
    "&:hover": {
      background: "#e4d7dd",
    },
  },
  productSummary: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "10px 0",
  },
}));

export default function Cart(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cart);
  const userId = useSelector(state => state.userDetails.userId);
  const { cartItems } = cartDetails;

  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    console.log(cartItems);
    const productsData = [];
    for (const val of cartItems) {
      const productCategory = data.filter(
        (value) => value.category === val.category
      );
      const productInfo = productCategory[0].products.filter(
        (value) => value.id === val.id
      );
      const productDetails = { ...productInfo[0], qty: val.qty, category: val.category };
      productsData.push(productDetails);
    }
    console.log("products", productsData);
    setShoppingCart(productsData);
  }, [cartDetails]);

  const [showSuccess, setShowSuccess] = React.useState(false);

  const updateQuantity = ({ id, category, ops }) => {
    if (ops === 1) {
      dispatch(addToCart({ productId: id, category, qty: 1 }));
    } else if (ops === 2) {
      dispatch(addToCart({ productId: id, category, qty: -1 }));
    } else {
      dispatch(removeProduct({ productId: id, category }));
    }
  };

  const navigateToHome = () => {
    props.history.push("/");
  };

  const handlePlaceOrder = () => {
    const orderHistory = JSON.parse(localStorage.getItem("orders")) || {};
    if(orderHistory.hasOwnProperty(userId)){
      orderHistory[userId].push(shoppingCart);
    }else{
      orderHistory[userId] = [shoppingCart];
    };
    localStorage.setItem("orders", JSON.stringify(orderHistory));
    setShowSuccess(true);
  };

  const productMarkup = (productInfo) => {
    console.log(productInfo);
    const { category, id, qty, price, url, name } = productInfo;
    return (
      <Card className={classes.cardroot}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={url}
            title={name}
          />
        </CardActionArea>
        <CardContent
          style={{
            marginLeft: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="h3"
            style={{ margin: "10px 0" }}
          >
            price: &#8377;{qty*price}
          </Typography>
          <div className="qty_container" className={classes.qtyContainer}>
            <Button
              size="small"
              color="primary"
              onClick={() => updateQuantity({ id, category, ops: 1 })}
            >
              <AddCircleIcon />
            </Button>
            <div>Quantity:{qty}</div>
            <Button
              size="small"
              color="primary"
              disabled={qty === 1}
              onClick={() => updateQuantity({ id, category, ops: 2 })}
            >
              <RemoveCircleIcon />
            </Button>
          </div>
          <Button
            size="small"
            color="primary"
            className={classes.removeBtn}
            onClick={() => updateQuantity({ id, category, ops: 3 })}
          >
            <div>Remove</div>
            <div>
              <DeleteIcon />
            </div>
          </Button>
        </CardContent>
      </Card>
    );
  };

  const productSummaryMarkup = (value) => {
    const { category, id, qty, price, name } = value;
    return (
      <div className={classes.productSummary}>
        <div className="product_name">
          {name} - ({qty} items)
        </div>
        <div className="product_price">&#8377;{qty*price}</div>
      </div>
    );
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    shoppingCart.map(val => totalPrice = totalPrice + (val.qty * val.price));
    return totalPrice;
  };


  return (
    <Grid container className={classes.root}>
      {showSuccess && <SuccessSnackBar {...props} />}
      {shoppingCart.length === 0 && (
        <div className="cart_empty">
          <Typography gutterBottom variant="h5" component="h2">
            Cart is Empty!
          </Typography>
          <Button
            size="small"
            color="primary"
            className={classes.removeBtn}
            onClick={() => navigateToHome()}
          >
            <div style={{ margin: "0 10px" }}>Navigate To Home</div>
            <HomeIcon />
          </Button>
        </div>
      )}
      <Grid item xs={6}>
        {shoppingCart.length > 0 &&
          shoppingCart.map((value) => (
            <Grid item xs={12} className={classes.category}>
              {productMarkup(value)}
            </Grid>
          ))}
      </Grid>
      {shoppingCart.length > 0 && (
        <Grid item xs={4}>
          <Card
            style={{
              border: "1px solid #ccc",
              boxShadow: "0px 1px 9px 3px",
              position: "fixed",
              width: "350px",
            }}
          >
            <CardHeader
              title="Order Summary"
              style={{
                boxShadow: "2px -1px 6px 2px",
                borderBottom: "1px solid #cec3c8",
                background: "#a9cbe8",
              }}
            />
            <CardContent style={{ margin: 0, padding: 0 }}>
              <div style={{ borderBottom: "1px solid #cec3c8" }}>
                {shoppingCart.map((value) => productSummaryMarkup(value))}
              </div>
              <div className={classes.productSummary}>
                <div className="product_name">Total</div>
                <div className="product_price" style={{ margin: "0 -50px" }}>
                &#8377;{getTotalPrice()}
                </div>
              </div>
              <Button
                size="small"
                color="primary"
                className={classes.placeorder}
                onClick={() => handlePlaceOrder()}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
