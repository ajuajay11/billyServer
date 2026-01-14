const express = require('express');
const router = express.Router();
const Customers = require('../models/customerSchema');
// const Invoice = require("../models/invoiceSchema");
router.get("/", async (req, res) => {
    try {
        const { username } = req.query;
        if (username) {
            const customer = await Customers.findOne({ username: username }).lean();

            if (!customer) {
                return res.status(404).json({
                    message: "Customer not found",
                });
            }

            return res.status(200).json({
                data: customer,
            });
        }

         const customers = await Customers.find()
            .sort({ createdAt: -1 })
            .lean();
        return res.status(200).json({
            data: customers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch customer",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // // const invoiceExists = await Invoice.exists({ customer: id });
        // if (invoiceExists) {
        //     return res.status(400).json({
        //         message: "Cannot delete customer. Invoices exist for this customer.",
        //     });
        // }
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
        const { username, discount } = req.body;

        if (!username || discount === undefined) {
            return res
                .status(400)
                .json({ message: "Please fill username and discount correctly" });
        }
        const newCustomer = await Customers.create({
            username: String(username).trim(),
            discount: Number(discount),
        });

        return res.status(201).json({
            message: "Customer created successfully",
            customer: newCustomer,
            status: 200
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;