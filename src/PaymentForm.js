/* eslint-disable no-unused-vars */
import Review from "./Review"
import { Divider, Typography, Button } from "@material-ui/core";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { actionTypes, getBasketTotal } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { accounting } from "accounting";
import axios  from "axios";
import { useState } from "react";
import { CircularProgress } from "material-ui-core";

const stripePromise = loadStripe("pk_test_51J8ZvKBRRhKxya3Hh37K2NB3lafezNPGF0iC4ScAStLycV8zd0KN1qkV7m8B6OPXgyWgHvnjoOKhzcCqIYxo11OH00zuPV8P7o")

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57,122)",
      color: "#333",
      fontSyze: "18px",
      "::placeholder": {
        color: "#ccc",
      },
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238",
      },
    },
  },
};

const CheckoutForm = ({ backStep, nextStep}) => {
  const [{ basket, paymentMessage }, dispatch] = useStateValue();
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const elements = useElements();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
  });
setLoading(true);
    if (!error) {
      const {id} = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout", 
        {
         id,
          amount: getBasketTotal(basket) * 100,
          });
          
      dispatch ({
        type: actionTypes.SET_PAYMENT_MESSAGE,
        paymentMessage: data.message
      });
if (data.message ==="Pago realizado"){
  dispatch({
    type: actionTypes.EMPTY_BASKET,
    basket:[],
  })
}
      elements.getElement(CardElement).clear();
      nextStep();
      } catch (error) { console.log(error) };
      console.log(error);
      nextStep();
   }
   setLoading(false);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div style={{
         display: "flex",
         justifyContent: "space-between",
          marginTop: "1rem" }}>
        <Button
         variant='otlined'
          onClick={backStep}>
            Volver
            </Button>
        <Button 
        disabled={!stripe} 
        type="submit"
        variant="contained"
         color="primary"
         >
           {
           loading ? (<CircularProgress/>) : (`Pagar ${accounting.formatMoney(getBasketTotal(basket),"$")}`)
}</Button>
        
      </div>

    </form>
  )
}

const PaymentForm = ({ backStep, nextStep }) => {
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Medios de pago
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm backStep={backStep} nextStep={nextStep} />
      </Elements>
    </>
  )
}

export default PaymentForm
