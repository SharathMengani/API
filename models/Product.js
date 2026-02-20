import mongoose from "mongoose"

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, required: true },
  count: { type: Number, required: true }
})

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // optional, MongoDB has its own _id
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: ratingSchema, required: true }
}, { timestamps: true })

export default mongoose.model("Product", productSchema)