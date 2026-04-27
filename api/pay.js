export default async function handler(req, res) {
  try {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      return res.status(500).json({ error: "Server key tidak ada" });
    }

    const response = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(serverKey + ":").toString("base64"),
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: "ORDER-" + Date.now(),
          gross_amount: 10000,
        },
      }),
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
