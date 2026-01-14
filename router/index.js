const express = require('express');
const router = express.Router();

const itemRouter = require('./item');
const customerRouter = require('./customer');
const invoiceRouter = require('./invoice');

router.use('/items', itemRouter);
router.use('/customer', customerRouter);
router.use('/invoice', invoiceRouter);
 
module.exports = router;