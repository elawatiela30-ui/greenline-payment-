import midtransClient from "midtrans-client";

export default async function handler(req, res) {
  try {
    if (!process.env.MIDTRANS_SERVER_KEY) {
      return res.status(500).json({ error: "Server key tidak ada" });
    }

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

    return res.status(200).json({
      redirect_url: transaction.redirect_url,
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      detail: error,
    });
  }
}
