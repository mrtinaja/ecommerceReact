import React from 'react'
import accounting from "accounting";
import { Button, makeStyles } from '@material-ui/core';
import { getBasketTotal } from '../reducer';
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh"
    },
    button: {
        marginTop: "2rem"
    }
}))


const Total = () => {
    const classes = useStyles()
    // eslint-disable-next-line no-unused-vars
    const [{ basket }, dispatch] = useStateValue();

    return (
        <div className={classes.root}>
            <h5>Total items: {basket?.length}</h5>
            <h5>{accounting.formatMoney (getBasketTotal (basket))}</h5>
            <Link to="/checkout"   >
            <Button className={classes.button} color="secondary" variant="contained" text-decoration="none"  >
                Check out
            </Button>
            </Link>
        </div>
    )
}

export default Total
