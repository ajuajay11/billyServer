const express = require('express');
const router = express.Router();
const Items = require('../models/itemsSchema');
// const Invoice = require("../models/invoiceSchema");
router.get("/", async (req, res) => {
  try {
    const {id}= req.query;
    if (id) {
      const item = await Items.findById(id).lean();

      if (!item) {
        return res.status(404).json({
          message: "Items not found",
        });
      }

      return res.status(200).json({
        data: item,
      });
    }
    const items = await Items.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      data: items,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch items",
      error: error.message,
    });
  }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
         const ItemsExist = await Items.exists({ _id: id });
        if (ItemsExist) {
            return res.status(400).json({
                message: "Cannot delete customer. Invoices exist for this customer.",
            });
        }
        const deletedCustomer = await Customers.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        return res.status(200).json({
            message: "Customer deleted successfully",
            customer: deletedCustomer,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ message: "Please fill name, phone, and price" });
        }

        const newItem = await Items.create({
            name: String(name).trim(),
            price: Number(price),
        });

        return res.status(201).json({
            message: "Item created successfully",
            item: newItem,
            status:200
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});


module.exports = router;