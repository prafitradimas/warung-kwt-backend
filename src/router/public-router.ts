
import express from "express";
import { hello } from "../controller/hello-controller.js";
import { LoginController } from "../controller/user-controller.js";

const publicRouter = express.Router();
publicRouter.get('/api/hello', hello);
publicRouter.post('/api/login', LoginController);

export { publicRouter };
