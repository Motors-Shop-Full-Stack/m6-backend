import AppDataSource from "../../data-source"
import { Announcement } from "../../entities/Announcement";
import { AppError } from "../../errors/AppError";

interface ICreateAnnouncementData {
    announceType: string,
    title: string
    fabricationYear: number
    km: number
    price: string
    description: string
    category: string
    announceCover: string
}

class AnnouncementService {
    static async listAnnouncementsService() {
        const manager = AppDataSource.getRepository(Announcement)
        const announcements = manager.find()
        return announcements
    }

    static async createAnnouncementsService(data: ICreateAnnouncementData): Promise<Announcement> {
        const manager = AppDataSource.getRepository(Announcement)

        const findAnnouncement = await manager.findOneBy({
            announceCover: data.announceCover,
          });
        
          if (findAnnouncement) {
            throw new AppError(400, "Announce image is already been used");
          }

        const announcement = manager.create(data)


        await manager.save(announcement)

        return announcement
    }
}
export default AnnouncementService;