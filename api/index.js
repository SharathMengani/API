import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "../config/db.js"
import Product from "../models/Product.js"


const app = express()
app.use(cors())
app.use(express.json())

// Connect DB for every request (serverless safe)
app.use(async (req, res, next) => {
  await connectDB()
  next()
})

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "API Working 🚀" })
})
// -------------------- GET ALL PRODUCTS --------------------
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// -------------------- GET PRODUCT BY ID --------------------
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }) // if using custom id
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// -------------------- GET PRODUCTS BY CATEGORY --------------------
app.get("/products/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category })
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// -------------------- CREATE PRODUCT --------------------
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// -------------------- UPDATE PRODUCT (PUT) --------------------
app.put("/products/:id", async (req, res) => {
  console.log('reqqqqqq', req.body.id)
  try {
    const product = await Product.findOneAndReplace(
      { id: req.body },
      req.body,
      { new: true, upsert: false } // upsert=false so it won't create new if not found
    )
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// -------------------- PATCH PRODUCT (PARTIAL UPDATE) --------------------
app.patch("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// -------------------- DELETE PRODUCT --------------------
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id })
    if (!product) return res.status(404).json({ message: "Product not found" })
    res.status(200).json({ message: "Product deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`))