import { response, Router } from "express";
import { verifyAuth } from "../verifyAuth.js";
import plantelEquipo from "../../model/PlantelEquipo.js";

const router = Router();

router.get("/team", verifyAuth, (_, res) => {
  // Obtener todos los equipos
  plantelEquipo.find({}, "equipos", function (error, plantelEquipo) {
    if (error) return next(error);
    res.send(plantelEquipo[0]);
  });
});

router.get("/team/:idTeam/players", verifyAuth, (req, res) => {
  let idTeam = req.params.idTeam;

  plantelEquipo.find(
    {},
    { equipos: { $elemMatch: { _id: idTeam } }, _id: false },
    function (error, plantelEquipo) {
      if (error) return next(error);
      let jugadores = plantelEquipo[0].equipos[0].jugadores;
      res.send(jugadores);
    }
  );
});

export default router;
