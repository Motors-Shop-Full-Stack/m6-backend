import AppDataSource from "../../data-source"
import { Announcement } from "../../entities/Announcement";

class AnnouncementService {
    static async listAnnouncementsService() {
        const manager = AppDataSource.getRepository(Announcement)
        const users = manager.find()
        return users
    }
}
export default AnnouncementService;