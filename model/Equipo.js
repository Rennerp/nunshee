import mongoose from "mongoose";

const EquipoSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
  },
  sigla: {
    type: String,
    require: true,
  },
  paisId: {
    type: Number,
    require: true,
  },
  paisNombre: {
    type: String,
    require: true,
  },
  Tipo: {
    type: String,
    require: true,
  },
  jugadores: {
    type: Array,
    require: true,
  },
  jugadoresDadosBaja: {
    type: Array,
  },
});

export default mongoose.model("equipos", EquipoSchema);
