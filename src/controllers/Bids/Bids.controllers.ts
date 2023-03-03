import { Request, Response } from "express";
import BidService from "../../services/Bids/Bids.service";

class BidController {
  static async createBidController(req: Request, res: Response) {
    const userId = req.body.user.id;
    const { value, announceId } = req.body;

    const newBid = await BidService.createBidService(userId, {
      value,
      announceId,
    });

    return res.status(201).json(newBid);
  }

  static async listAllBidController(req: Request, res: Response) {
    const bids = await BidService.listAllBindsService();

    return res.status(200).json(bids);
  }

  static async retrieveBidController(req: Request, res: Response) {
    // const bid = await BidService.retrieveBindService()
  }
}
export default BidController;
