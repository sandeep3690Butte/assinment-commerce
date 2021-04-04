import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import data from "../../data/products.json";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../actions/cart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "10px",
    position: "relative",
    top: "60px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "15px",
    borderBottom: "1px solid #dbd5d5",
    boxShadow: "-2px 0px 6px 2px;",
  },
  cardroot: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  category: {
    display: "flex",
    flexDirection: "Column",
    margin: "0 20px",
  },
  products: {
    display: "flex",
  },
}));

function Home(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [products, setProducts] = useState(data);

  const addProductToCart = (productId, category) => {
    dispatch(addToCart({ productId, category, qty: 1 }));
  };

  const productsDescription = (product, category) => {
    const { name, size, price, description, url, id } = product;
    return (
      <Card className={classes.cardroot}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h5"
              variant="h5"
              style={{margin: "10px 0", color:"rgb(16 16 16)"}}
            >
              Price: &#8377;{price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => addProductToCart(id, category)}
            style={{ background: "#cec3c8" }}
          >
            ADD TO CART
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <Grid container className={classes.root}>
      {data.length > 0 &&
        data.map((value) => (
          <Grid container spacing={3} className={classes.category}>
            <h2 className={classes.paper}>{value.category}</h2>
            <div className={classes.products}>
              {value.products.map((data) => (
                <Grid item xs={4} sm={4}>
                  {productsDescription(data, value.category)}
                </Grid>
              ))}
            </div>
          </Grid>
        ))}
    </Grid>
  );
}

export default Home;
