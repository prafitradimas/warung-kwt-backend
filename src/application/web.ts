
import express from "express";
import { publicRouter } from "../router/public-router.js";

export const web = express();
web.use(express.json());
web.use(publicRouter);
