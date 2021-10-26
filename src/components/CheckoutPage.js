import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CheckoutCard from "./CheckoutCard";
import Grid from "@material-ui/core/Grid";
import Total from './Total';
import { useStateValue } from "../StateProvider";




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: "2rem",

    }
}));

const CheckoutPage = () => {
    const classes = useStyles();

    /* eslint-disable no-unused-vars */

    // eslint-disable-next-line no-unused-vars

    const [{ basket }, dispatch] = useStateValue();


    function FormRow() {
        return (
            <React.Fragment>
                {basket.map((item) => (
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <CheckoutCard key={item.id} product={item} />
                    </Grid>
                ))}
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography aligne='center' gutterBottom variant='h4'>
                        Carrito de compras
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={9} container spacing={2} >
                    <FormRow />
                </Grid>
                <Grid item xs={12} sm={4} md={3} container spacing={2} >
                    <Typography aligne='center' gutterBottom variant='h4'>
                        <Total />
                    </Typography>
                </Grid>
            </Grid>
        </div >
    );
};

export default CheckoutPage;

