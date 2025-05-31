const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController');

// User routes
router.post('/', auth, createOrder);
router.get('/my-orders', auth, getUserOrders);
router.get('/my-orders/:id', auth, getOrder);

// Admin routes
router.get('/', adminAuth, getAllOrders);
router.patch('/:id/status', adminAuth, updateOrderStatus);

module.exports = router; 