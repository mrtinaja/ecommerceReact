
const express = require("express"); // FR de node js 
const Stripe = require("stripe");
// eslint-disable-next-line no-unused-vars
const cors = require("cors") ;

// eslint-disable-next-line no-unused-vars
const stripe = new Stripe("sk_test_51J8ZvKBRRhKxya3HBeI3EUN1ejFSvVBMWvLSUrxdbqpD7xlJpGMSymY366NlvTWd9J0oHYQe8AzzyxqNWkaW9y7S00qfxM13sR");
 
const app = express();

app.post("/api/checkout", async (req, res) => {
    console.log(req.body);
  const {id, amount} = req.body;



try {
  const payment = await Stripe.paymentIntents.create({
    amount,
    cureency: "Pesos",
    description: "Carro de compras",
    payment_method: id,
    confirm: true,
  });

  console.log(payment);

  return res.status(200).json({message: "Pago realizado"});
}catch (error) {
return res.json({message: error.raw.message})
};

}
)
