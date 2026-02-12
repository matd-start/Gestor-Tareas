import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {// usamos este user para hacer referencia al usuario que ha creado la tarea
      type: Schema.Types.ObjectId, // 
      ref: "User", // "user" es la variable que hace referencia al modelo que creamos en user.js
      required: true, // el usuario debe existir
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Task", TaskSchema);
