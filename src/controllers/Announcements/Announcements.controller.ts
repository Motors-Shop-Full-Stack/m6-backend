import { Request, Response } from "express";
import AnnouncementService from "../../services/Announcements/Announcements.service";

class AnnouncementController {
  static async listAnnouncementController(req: Request, res: Response) {
    const announcements = await AnnouncementService.listAnnouncementsService()
    return res.status(200).json(announcements);
  }

  static async createAnnouncementController(req: Request, res: Response) {
    const announcements = await AnnouncementService.createAnnouncementsService(req.body)
    
    return res.status(201).json(announcements);
  }
}

export default AnnouncementController;
