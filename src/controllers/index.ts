import { Request, Response } from "express";

class Test {
  static async testController(req: Request, res: Response) {
    return res.status(200).json({
      message: "OK!",
    });
  }
}
export default Test;
