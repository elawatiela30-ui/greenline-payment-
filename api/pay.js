import midtransClient from "midtrans-client";

export default async function handler(req, res) {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: "ORDER-" + Date.now(),
        gross_amount: 10000,
      },
    });

    res.status(200).json({
      redirect_url: transaction.redirect_url,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
