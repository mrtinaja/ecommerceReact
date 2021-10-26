/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { actionTypes } from "../reducer";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useStateValue } from "../StateProvider";
import DeleteIcon from '@material-ui/icons/Delete';
import accounting from 'accounting';






const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    action: {
      marginTop: "1rem"
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },



  avatar: {
    backgroundColor: red[500],
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
  },
  cardRating: {
    display: "flex",

  }
}));

export default function CheckoutCard({
  product: { id, name, productType, image, price, rating, description },
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [{ basket }, dispatch] = useStateValue();



  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const removeItem = () => dispatch({
    type: actionTypes.REMOVE_ITEM,
    id: id,
  })

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <Typography
            className={classes.actiom}
            variant='h5'
            color='text-secondary'
          > {accounting.formatMoney (price)}
          </Typography>
        }

        title={name}
        subheader="In Stock"
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={name} />
      <CardActions disableSpacing className={classes.cardActions}>
        <div className={classes.cardRating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>&#11088;</p>
            ))}
        </div>
        <IconButton>
          <DeleteIcon fontSize="large" color="prymary" onClick={removeItem} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
