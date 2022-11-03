import { Router } from "express";
import AnnouncementController from "../controllers/Announcements/listAnnouncements.controller";


const announcementsRoute = Router();

announcementsRoute.get("", AnnouncementController.listAnnouncementController);

export default announcementsRoute;
