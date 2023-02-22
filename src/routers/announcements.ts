import { Router } from "express";
import AnnouncementController from "../controllers/Announcements/Announcements.controller";
import VerifyAnnouncementOwner from "../middlewares/authentication/verifyAnnouncementOwner";
import VerifyToken from "../middlewares/authentication/verifyToken";

const announcementsRoute = Router();

announcementsRoute.get("", AnnouncementController.listAnnouncementController);
announcementsRoute.post(
  "",
  VerifyToken,
  AnnouncementController.createAnnouncementController
);
announcementsRoute.get(
  "/:id",
  AnnouncementController.retrieveAnnouncementController
);
announcementsRoute.patch(
  "/:id",
  VerifyToken,
  VerifyAnnouncementOwner,
  AnnouncementController.updateAnnouncementController
);
announcementsRoute.delete(
  "/:id",
  VerifyToken,
  VerifyAnnouncementOwner,
  AnnouncementController.deleteAnnouncementController
);

export default announcementsRoute;
