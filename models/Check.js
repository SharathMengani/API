import mongoose from "mongoose"

const checkSchema = new mongoose.Schema({
  title: String,
  price: Number,
  category: String
}, { timestamps: true })

export default mongoose.model("Check", checkSchema)