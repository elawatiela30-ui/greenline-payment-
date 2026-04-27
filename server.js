const express = require("express");
const midtransClient = require("midtrans-client");

const app = express();

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

app.get("/", (req, res) => {
  res.send("OK backend jalan");
});

app.get("/pay", async (req, res) => {
  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: "ORDER-" + Date.now(),
      gross_amount: 10000
    }
  });

  res.json(transaction);
});

app.listen(3000, () => console.log("server jalan"));
