
import express from "express";
import { hello } from "../controller/hello-controller.js"

const publicRouter = express.Router();
publicRouter.get('/api/hello', hello);

export { publicRouter };
