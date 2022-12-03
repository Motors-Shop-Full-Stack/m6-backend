import { Request, Response } from "express";
import CommentService from "../services/Comment.service";

class CommentController {
    static async listCommentsController(req: Request, res: Response) {
      const users = await CommentService.listCommentsService()
      return res.status(200).json(users);
    }
  
    static async createCommentController(req: Request, res: Response) {
      const user = await CommentService.createCommentsServcie(req.body)
  
      return res.status(201).json(user);
    }
  
  }
  
  export default CommentController;