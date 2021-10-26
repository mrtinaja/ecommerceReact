import {  Typography, Divider} from '@material-ui/core';
import React from 'react';

const Confirmation = ({message}) => {
    console.log(message)
    return (
        <>
           <Typography  variant="h6">{message}</Typography>
           <Divider/>
           <Typography variant="subtitle2" gutterBottom> 
           {message === "Pago realizado"
            ? "Your booking reference: Rgh87878781kj"
            : ""}
            </Typography>
          
        </>
    )
}

export default Confirmation
