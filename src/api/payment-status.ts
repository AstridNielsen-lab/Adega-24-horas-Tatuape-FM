import express from 'express';

const router = express.Router();

router.get('/payment-status', async (req, res) => {
  const { preferenceId } = req.query;

  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/search?preference_id=${preferenceId}`, {
      headers: {
        'Authorization': `Bearer APP_USR-7360543350942011-032204-90ed0249b3e19ddde7e2bdc347d18be0-29008060`
      }
    });

    const data = await response.json();
    const payment = data.results[0];

    if (payment && payment.status === 'approved') {
      res.json({ status: 'approved' });
    } else {
      res.json({ status: 'pending' });
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;