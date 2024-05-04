import mongoose from "mongoose";
const proposalSchema = mongoose.Schema({
  proposedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Projects",
  },
  proposedDuration: {
    type: Number,
  },
  proposedPrice: {
    type: Number,
  },
  finalprice: {
    type: Number,
  },
  proposalStatus: {
    type: String,
    enum: ["active", "completed", "available"],
    default: "available",
  },
});
export const Proposal = mongoose.model(
  "Proposals",
  proposalSchema,
  "Proposals"
);
