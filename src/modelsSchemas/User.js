// 3. Importamos mongoose para poder definir el esquema y el modelo de datos
import mongoose from "mongoose";

//modelo de datos de usuario
const UserSchema = new mongoose.Schema(// Schema es una clase de mongoose que define la estructura de los documentos que se guardaran en la base de datos
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // agrega campos de createdAt y updatedAt automaticamente
    versionKey: false,
  }
);
// .model es un metodo de mongoose que nos permite crear un modelo de datos a partir de un esquema definido con la clase Schema
export default mongoose.model("User", UserSchema);
