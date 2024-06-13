"use strict";

const express = require("express");
const multer = require("multer");
const fsPromises = require("fs/promises");
const bodyParser = require("body-parser");

const app = express();
const upload = multer();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.none());
app.use(express.static("public"));
app.use(express.json());

const handleReadFile = async (filePath) => {
    return JSON.parse(await fsPromises.readFile(filePath, "utf8"));
};

const handleWriteFile = async (filePath, data) => {
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
};


app.get("/data", async (req, res) => {
    try {
        const data = await handleReadFile("data/data.json");
        res.json(data);
    } catch (error) {
        res.status(500).send("Failed to retrieve data.");
    }
});

app.get("/cart", async (req, res) => {
    try {
        const cartItems = await handleReadFile("data/cart.json");
        res.json(cartItems);
    } catch (error) {
        res.status(500).send("Failed to retrieve cart items.");
    }
});

app.get("/review", async (req, res) => {
    try {
        const reviews = await handleReadFile("data/review.json");
        res.json(reviews);
    } catch (error) {
        res.status(500).send("Failed to retrieve reviews.");
    }
});

app.get("/user", async (req, res) => {
    try {
        const logins = await handleReadFile("data/user.json");
        res.json(logins);
    } catch (error) {
        res.status(500).send("Failed to retrieve user details.");
    }
});

app.post("/addToCart", async (req, res) => {
    const { name, quantity, flavor, image, price } = req.body;
    if (!name || !quantity || !flavor || !image || !price) {
        return res.status(400).send("Missing product information.");
    }

    try {
        const cart = await handleReadFile("data/cart.json");
        cart.push({ name, quantity, flavor, image, price });
        await handleWriteFile("data/cart.json", cart);
        res.send("Product added to cart successfully.");
    } catch (error) {
        res.status(500).send("Failed to add product to cart.");
    }
});

app.post("/addToContact", async (req, res) => {
    const { name, date, info } = req.body;
    if (!name || !date || !info) {
        return res.status(400).send("Missing contact information.");
    }

    try {
        const contacts = await handleReadFile("data/contact.json");
        contacts.push({ name, date, info });
        await handleWriteFile("data/contact.json", contacts);
        res.send("Contact information submitted successfully.");
    } catch (error) {
        res.status(500).send("Failed to submit contact information.");
    }
});

app.post("/removeCart", async (req, res) => {
    const { name, flavor, quantity } = req.body;
    if (!name || !flavor || !quantity) {
        return res.status(400).send("Missing product details for removal.");
    }

    try {
        let cart = await handleReadFile("data/cart.json");
        cart = cart.filter(item => !(item.name === name && item.quantity === quantity && item.flavor === flavor));
        await handleWriteFile("data/cart.json", cart);
        res.send("Product removed from cart successfully.");
    } catch (error) {
        res.status(500).send("Failed to remove product from cart.");
    }
});

app.post("/addToReviews", async (req, res) => {
    const { name, coffee, review } = req.body;
    if (!name || !coffee || !review) {
        return res.status(400).send("Missing review details.");
    }

    try {
        const reviews = await handleReadFile("data/review.json");
        reviews.push({ name, coffee, review });
        await handleWriteFile("data/review.json", reviews);
        res.send("Review added successfully.");
    } catch (error) {
        res.status(500).send("Failed to add review.");
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
