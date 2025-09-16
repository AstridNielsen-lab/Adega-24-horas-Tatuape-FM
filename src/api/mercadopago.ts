import express from 'express';
import { useOrderStore } from '../store/orderStore';

const router = express.Router();

router.post('/webhook', async (req, res) => {
  try {
    const { data } = req.body;
    
    if (data.type === 'payment') {
      const paymentId = data.id;
      
      // Fetch payment details from Mercado Pago
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer APP_USR-7360543350942011-032204-90ed0249b3e19ddde7e2bdc347d18be0-29008060`
        }
      });
      
      const paymentData = await response.json();
      
      if (paymentData.status === 'approved') {
        const orderStore = useOrderStore.getState();
        
        // Create new order from payment data
        const newOrder = {
          id: paymentId,
          date: new Date().toISOString(),
          status: 'completed',
          total: paymentData.transaction_amount,
          items: paymentData.additional_info.items.map((item: any) => ({
            product: {
              id: item.id,
              name: item.title,
              price: item.unit_price
            },
            quantity: item.quantity
          }))
        };
        
        // Add order to store
        orderStore.addOrder(newOrder);
      }
    }
    
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;