import { Router } from "express";
import BidController from "../controllers/Bids/Bids.controllers";
import VerifyToken from "../middlewares/authentication/verifyToken";

const bidsRoute = Router();

//create bid
bidsRoute.post("/", VerifyToken, BidController.createBidController);

//list All
bidsRoute.get("", BidController.listAllBidController);

export default bidsRoute;
