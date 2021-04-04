import { Card, CardContent, CardHeader, CardMedia, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  removeBtn: {
    background: "#cec3c8",
    margin: "10px 0",
    "&:hover": {
      background: "#e4d7dd",
    },
  },
  empty: {
    position: "absolute",
    left: "50%",
    top: "50%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function OrderHistory(props) {
  const classes = useStyles();
  const [orderDetails, setOrderDetails] = React.useState([]);
  const userId = useSelector((state) => state.userDetails.userId);

  React.useEffect(() => {
    console.log("order hostiry");
    const orderDetails = JSON.parse(localStorage.getItem("orders"));
    const orderHistory = (orderDetails && orderDetails[userId]) || [];
    console.log(orderHistory);
    setOrderDetails(orderHistory);
  }, []);

  const navigateToHome = () => {
    props.history.push("/");
  };

  return (
    <Grid container spacing={3}>
      {orderDetails.length === 0 && (
        <div className="empty" className={classes.empty}>
          <Typography gutterBottom variant="h5" component="h2">
            No any orders placed.
          </Typography>
          <Button
            size="small"
            color="primary"
            className={classes.removeBtn}
            onClick={() => navigateToHome()}
          >
            <div style={{ margin: "0 10px" }}>Continue Shopping</div>
            <HomeIcon />
          </Button>
        </div>
      )}
      {orderDetails.length > 0 && (
        <Grid
          container
          spacing={3}
          style={{ position: "relative", top: "80px" }}
        >
          {orderDetails.map((value) => (
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid",
                boxShadow: "0 1px 3px",
              }}
            >
                <h2>Order NO:11111</h2>
              {value.map((data) => (
                <Card style={{ width: "250px", margin: "0 20px" }}>
                  <CardContent>
                    <div className="card_media">
                      <CardMedia
                        className={classes.media}
                        image={data.url}
                        title={data.name}
                      />
                    </div>
                    <div className="product_details">
                      <div className="name">{data.name}</div>
                      <div className="price Details">
                        <div className="qty">Quantity:{data.qty}</div>
                        <div className="price_details">
                          {data.price}/quantity
                        </div>
                        <div className="total_price">
                          totalPrice: {data.qty * data.price}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}
