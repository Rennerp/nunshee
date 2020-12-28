import mongoose from "mongoose";

const plantelEquipoSchema = new mongoose.Schema({
  deporte: {
    type: Object,
  },
  categoria: {
    type: Object,
  },
  campeonato: {
    type: Object,
  },
  campeonatoNombreAlternativo: {
    type: Object,
  },
  fechaActual: {
    type: String,
  },
  equipos: [],
});

export default mongoose.model(
  "plantelEquipo",
  plantelEquipoSchema,
  "plantelEquipo"
);
