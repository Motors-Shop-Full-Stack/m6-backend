import { Router } from "express";
import AnnouncementController from "../controllers/Announcements.controller";
import VerifyToken from "../middlewares/authentication/verifyToken";


const announcementsRoute = Router();

announcementsRoute.get("", AnnouncementController.listAnnouncementController);
announcementsRoute.post("", VerifyToken, AnnouncementController.createAnnouncementController);

export default announcementsRoute;
