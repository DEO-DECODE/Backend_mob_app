import mongoose from "mongoose";
const proposalSchema = mongoose.Schema({
  proposedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
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
  "Proposal",
  proposalSchema,
  "Proposal"
);
