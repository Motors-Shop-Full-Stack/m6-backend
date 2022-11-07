import AppDataSource from "../data-source"
import { Announcement } from "../entities/Announcement";
import { AppError } from "../errors/AppError";

interface ICreateAnnouncementProps{
    data: ICreateAnnouncementData
    token: string
}

interface ICreateAnnouncementData {
    announceType: string,
    title: string
    fabricationYear: number
    km: number
    price: string
    description: string
    category: string
    announceCover: string
    user: any
}

class AnnouncementService {
    static async listAnnouncementsService() {
        const manager = AppDataSource.getRepository(Announcement)
        const announcements = manager.find()
        return announcements
    }

    static async createAnnouncementsService(data: ICreateAnnouncementData) {
        const manager = AppDataSource.getRepository(Announcement)

        const findAnnouncement = await manager.findOneBy({
            announceCover: data.announceCover,
          });
        
          if (findAnnouncement) {
            throw new AppError(400, "Announce image is already been used");
          }

        const formatedAnnouncement = {
            announceType: data.announceType,
            title: data.title,
            fabricationYear: data.fabricationYear,
            km: data.km,
            price: data.price,
            description: data.description,
            category: data.category,
            announceCover: data.announceCover,
            userId: data.user.id
        }

        const announcement = manager.create(formatedAnnouncement)

        await manager.save(announcement)

        return announcement
    }
}
export default AnnouncementService;