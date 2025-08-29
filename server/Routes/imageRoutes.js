import express from "express";
import {generateImage} from "../Controllers/imageController.js";
import userAuth from "../Middlewares/auth.js";

const imageRouter = express.Router();

imageRouter.post("/generate", userAuth, generateImage);

export default imageRouter;
// http://localhost:4000/api/image/generate            