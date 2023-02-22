import AppDataSource from "../data-source";
import { Announcement } from "../entities/Announcement";
import { AppError } from "../errors/AppError";

interface IUpdateAnnouncement {
  announceType?: string;
  title?: string;
  fabricationYear?: number;
  km?: number;
  price?: string;
  description?: string;
  category?: string;
  announceCover?: string;
  user?: any;
}

interface ICreateAnnouncementData {
  announceType: string;
  title: string;
  fabricationYear: number;
  km: number;
  price: number;
  description: string;
  category: string;
  announceCover: string;
  user: any;
}

class AnnouncementService {
  static async listAnnouncementsService() {
    const manager = AppDataSource.getRepository(Announcement);
    const announcements = manager.find();
    return announcements;
  }

  static async createAnnouncementsService(
    data: ICreateAnnouncementData,
    id: string
  ) {
    const manager = AppDataSource.getRepository(Announcement);

    const findAnnouncement = await manager.findOneBy({
      announceCover: data.announceCover,
    });

    if (findAnnouncement) {
      throw new AppError(400, "Announce image is already been used");
    }

    const announcement = new Announcement();
    announcement.announceType = data.announceType;
    announcement.title = data.title;
    announcement.fabricationYear = data.fabricationYear;
    announcement.km = data.km;
    announcement.price = data.price;
    announcement.description = data.description;
    announcement.category = data.category;
    announcement.announceCover = data.announceCover;
    announcement.user = data.user.id;

    await manager.save(announcement);

    return announcement;
  }

  static async retrieveAnnouncementService(id: string) {
    const manager = AppDataSource.getRepository(Announcement);
    const announcement = await manager.findOne({
      where: { id: id },
      relations: ["user", "comments.user"],
    });

    if (!announcement) {
      throw new AppError(404, "Announcement not found");
    }

    return announcement;
  }

  static async deleteAnnouncementService(id: string) {
    const manager = AppDataSource.getRepository(Announcement);

    const announcement = await manager.findOneBy({ id: id });

    if (!announcement) {
      throw new AppError(404, "User not found");
    }

    await manager.delete({ id: id });
  }

  static async updateAnnouncementService(
    id: string,
    data: IUpdateAnnouncement
  ) {
    const manager = AppDataSource.getRepository(Announcement);
    const announcement = await manager.findOneBy({ id: id });

    if (!announcement) {
      throw new AppError(404, "Announcement not found");
    }

    await AppDataSource.createQueryBuilder()
      .update(Announcement)
      .set(data)
      .where("id = :id", { id: id })
      .execute();

    const updatedAnnouncement = await manager.findOneBy({ id: id });
    return updatedAnnouncement;
  }
}
export default AnnouncementService;
