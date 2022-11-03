import { Request, Response } from "express";
import AnnouncementService from "../../services/Announcements/listAnnouncements.service";

class AnnouncementController {
  static async listAnnouncementController(req: Request, res: Response) {
    const announcements = await AnnouncementService.listAnnouncementsService()
    return res.status(200).json(announcements);
  }
}

export default AnnouncementController;
