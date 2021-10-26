/* eslint-disable no-dupe-keys */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Badge, Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import logo from "../assets/descarga.png";
import { ShoppingCart } from '@material-ui/icons';
import { Link } from "react-router-dom";
import { useStateValue, } from "../StateProvider";
import { actionTypes } from '../reducer';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appBar: {
    background: "rgb(17,1,3)",
background: "-moz-linear-gradient(0deg, rgba(17,1,3,1) 0%, rgba(113,54,64,1) 0%, rgba(88,46,112,1) 0%, rgba(219,60,96,1) 100%)",
background: "-webkit-linear-gradient(0deg, rgba(17,1,3,1) 0%, rgba(113,54,64,1) 0%, rgba(88,46,112,1) 0%, rgba(219,60,96,1) 100%)",
background:  "linear-gradient(0deg, rgba(17,1,3,1) 0%, rgba(113,54,64,1) 0%, rgba(88,46,112,1) 0%, rgba(219,60,96,1) 100%)",

  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  image: {
    marginRight: "10px",
  }
}));

const NavBar = () => {
  const classes = useStyles();
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory()

  const handleAuth = ()=>{
    if (user){
    auth.signOut();
    dispatch({ 
      type: actionTypes.EMPTY_BASKET,
      basket: [], 
     });
     dispatch({ 
      type: actionTypes.SET_USER,
      user: null, 
     });
    history.push("/")
  }
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" className={classes.AppBar} color="inherit" aria-label="menu">
              <img src={logo} alt="" className={classes.image} width="80px" />
            </IconButton>
          </Link>

          <div className={classes.grow} />
          <Typography variant="h6" textColor="primary" component="p">
             Hola {user ? user.email: "Guest"}
          </Typography>
          <div className={classes.button}>
            <Link to="/signin">
              <Button variant="outlined" onClick={handleAuth}>
                <strong>{user? "Sign Out" : "Sign In"}</strong>
              </Button>
            </Link>
            <Link to="checkout-page">
              <IconButton arial-label="show car items" color="inherit">
                <Badge badgeContent={basket?.length} color="secondary">
                  <ShoppingCart fontSize="large" color="yellow" />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
  }


export default NavBar;
