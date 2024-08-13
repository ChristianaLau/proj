import mongoose from "mongoose";

const WeightUpdateSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
});

export default mongoose.models.weightUpdate || mongoose.model('WeightUpdate', WeightUpdateSchema);
