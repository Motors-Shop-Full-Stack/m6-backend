import { Router } from "express";
import BidController from "../controllers/Bids/Bids.controllers";
import VerifyToken from "../middlewares/authentication/verifyToken";

const bidsRoute = Router();

//create bid
bidsRoute.post("/:userId", BidController.createBidController);

export default bidsRoute;
