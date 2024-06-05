import mongoose from "mongoose";

const ClearedPageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pageId: {
    type: String,
    required: true
  },
  clearedAt: {
    type: Date,
    default: Date.now
  }
},
{ timestapms: true}
);


export default mongoose.model("ClearedPage", ClearedPageSchema);
