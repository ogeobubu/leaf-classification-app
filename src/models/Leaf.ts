import mongoose, { Schema, Document } from "mongoose";

interface LeafDocument extends Document {
  species: string;
  image: string;
  features: {
    length: number;
    width: number;
    color: string;
  };
}

const leafSchema: Schema = new Schema({
  species: { type: String, required: true },
  image: { type: String, required: true },
  features: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    color: { type: String, required: true },
  },
});

export const Leaf = mongoose.model<LeafDocument>("Leaf", leafSchema);
