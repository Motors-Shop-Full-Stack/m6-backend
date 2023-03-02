import { Request, Response } from "express";
import BidService from "../../services/Bids/Bids.service";

class BidController {
  static async createBidController(req: Request, res: Response) {
    const { userId } = req.params;
    const { value, announceId } = req.body;
    console.log(userId);

    const newBid = await BidService.createBidService(userId, {
      value,
      announceId,
    });

    return res.status(201).json({ message: "Done!" });
  }

  static async listAllBidController(req: Request, res: Response) {
    const bids = await BidService.listAllBindsService();

    return res.status(200).json(bids);
  }
}
export default BidController;
