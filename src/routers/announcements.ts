import { Router } from "express";
import AnnouncementController from "../controllers/Announcements/Announcements.controller";


const announcementsRoute = Router();

announcementsRoute.get("", AnnouncementController.listAnnouncementController);
announcementsRoute.post("", AnnouncementController.createAnnouncementController);

export default announcementsRoute;
