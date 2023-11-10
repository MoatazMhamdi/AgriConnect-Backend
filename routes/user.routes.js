import { authJwt } from "../middlewares/index.js";
import { allAccess, userBoard, FarmerBoard, adminBoard } from "../controllers/user.controller.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isFarmer],
    FarmerBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminBoard
  );
}
