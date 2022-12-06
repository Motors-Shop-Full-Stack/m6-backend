import { Router } from "express";
import CommentController from "../controllers/Comment.controller";
import VerifyToken from "../middlewares/authentication/verifyToken";

const commentRoute = Router();

commentRoute.post("/:id", VerifyToken, CommentController.createCommentController);

export default commentRoute;