import { Request, Response } from "express";
import CommentService from "../../services/Comment.service";

class CommentController {
  static async createCommentController(req: Request, res: Response) {
    const comment = await CommentService.createCommentsService(
      req.body,
      req.params.id
    );

    return res.status(201).json(comment);
  }
}

export default CommentController;
