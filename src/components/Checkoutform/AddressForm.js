/* eslint-disable no-unused-vars */
import { Typography, Grid, Button } from '@material-ui/core';
import { useForm, FormProvider } from "react-hook-form";
import AddressInput from './AddressInput';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

const AddressForm = ({nextStep}) => {
 const methods = useForm();
 const [{ shippingData }, dispatch] = useStateValue();
  return (
 <>
      <Typography variant='h6' gutterBottom>
        Dirección de Envío
      </Typography> 
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => {
        dispatch ({
          type: actionTypes.SET_SHIPPINGDATA,
          shippingData: data,
        });
        nextStep();
        
        })}>
          <Grid container spacing={3}>
    <AddressInput required name= "first name" label= "Nombre"/>
    <AddressInput required name= "last name" label= "Apellido"/>
    <AddressInput required name= "address name" label= "Dirección"/>
    <AddressInput required name= "email name" label= "Email"/>
    <AddressInput required name= "city name" label= "Ciudad"/>
    <AddressInput required name= "postCode name" label= "Código postal"/>
          </Grid>
          <div style={{ display:"flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <Button component={Link} to="/checkout-page" >Volver</Button>
          <Button type="submit" variant="contained" color="primary">Siguiente</Button>
          </div>
         
        </form>
      </FormProvider>

    </>
  )
}

export default AddressForm
