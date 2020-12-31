import { Router } from "express";
import { verifyAuth } from "../verifyAuth.js";
import Equipo from "../../model/Equipo.js";

const router = Router();

router.get("/", verifyAuth, (_, res) => {
  // Obtener todos los equipos
  Equipo.find(
    {},
    "nombre sigla paisId paisNombre Tipo",
    function (error, equipo) {
      if (error) return next(error);
      res.send({ equipos: equipo });
    }
  );
});

router.get("/:idTeam/players", verifyAuth, (req, res) => {
  let idTeam = req.params.idTeam;

  Equipo.find(
    { equipo_id: idTeam },
    "jugadores jugadoresDadosBaja",
    function (error, jugadores) {
      if (error) return next(error);
      res.send(jugadores);
    }
  );
});

router.get("/players/:position", verifyAuth, (req, res, next) => {
  let position = req.params.position;
  Equipo.find(
    { "jugadores.rol.rol": position },
    {
      jugadores: { $elemMatch: { "rol.rol": position } },
      equipo_id: true,
      nombre: true,
      _id: false,
    },
    function (error, jugadores) {
      if (error) return next(error);
      res.send(jugadores);
    }
  );
});

export default router;
