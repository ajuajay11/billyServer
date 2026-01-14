const express = require('express');
const router = express.Router();
const Invoice = require("../models/invoiceSchema");
const Items = require("../models/itemsSchema");
const Customers = require("../models/customerSchema");


router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("customer", "userName discount")
      .populate("items.item", "name phone price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      data: invoices,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch invoices",
      error: error.message,
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const {
      customer,
      date,
      items,
      subtotal,
      discountPercent,
      grandTotal,
    } = req.body;

    if (!customer || !date || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const customerExists = await Customers.findById(customer);
    if (!customerExists) {
      return res.status(400).json({ message: "Invalid customer" });
    }
    for (const row of items) {
      const itemExists = await Items.findById(row.item);
      if (!itemExists) {
        return res.status(400).json({ message: "Invalid item" });
      }
    }

    const invoice = await Invoice.create({
      customer,
      date,
      items,
      subtotal,
      discountPercent,
      grandTotal,
    });

    return res.status(201).json({
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;