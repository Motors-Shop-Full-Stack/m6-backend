import { Router } from "express";
import CommentController from "../controllers/Comment.controller";
import VerifyToken from "../middlewares/authentication/verifyToken";

const commentRoute = Router();

commentRoute.get("", CommentController.listCommentsController);
commentRoute.post("", VerifyToken, CommentController.createCommentController);

export default commentRoute;