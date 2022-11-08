import { Request, Response } from "express";
import AnnouncementService from "../services/Announcements.service"

class AnnouncementController {
  static async listAnnouncementController(req: Request, res: Response) {
    const announcements = await AnnouncementService.listAnnouncementsService()
    return res.status(200).json(announcements);
  }

  static async createAnnouncementController(req: Request, res: Response) {
    const announcements = await AnnouncementService.createAnnouncementsService(req.body, req.body.user.id)
    return res.status(201).json(announcements);
  }

  static async retrieveAnnouncementController(req: Request, res: Response) {
    const announcement = await AnnouncementService.retrieveAnnouncementService(req.params.id);

    return res.status(200).json(announcement);
  }

  static async deleteAnnouncementController(req: Request, res: Response) {
    await AnnouncementService.deleteAnnouncementService(req.params.id)

    return res.status(204).json({ message: "Announcement deleted" })
  }

  static async updateAnnouncementController(req: Request, res: Response) {
    const { id } = req.params
    const announcement = await AnnouncementService.updateAnnouncementService(id, req.body)
    return res.status(200).json(announcement)
}
}

export default AnnouncementController;
