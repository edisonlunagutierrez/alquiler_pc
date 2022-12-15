import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    //------------------
    documento: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    //----------------
    descripcion: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", NoteSchema);
