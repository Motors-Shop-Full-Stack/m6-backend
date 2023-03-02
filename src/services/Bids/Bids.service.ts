import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Bid } from "../../entities/Bid";
import { Announcement } from "../../entities/Announcement";
import { User } from "../../entities/User";
import { ICreateBid } from "../../interfaces/Bids";

class BidService {
  static bidRepository = AppDataSource.getRepository(Bid);
  static userRepository = AppDataSource.getRepository(User);
  static announceRepository = AppDataSource.getRepository(Announcement);

  static async createBidService(
    userId: string,
    { value, announceId }: ICreateBid
  ): Promise<boolean> {
    if (!announceId) {
      throw new AppError(400, "Announce ID is missing!");
    }

    const findUser = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!findUser) {
      throw new AppError(404, "User not found!");
    }

    const findAnnounce = await this.announceRepository.findOne({
      where: { id: announceId },
    });
    if (!findAnnounce) {
      throw new AppError(404, "Announce not found!");
    }
    console.log(findAnnounce);

    // const newBid = this.bidRepository.create({
    //   value,
    //   user: findUser,
    //   announcement: findAnnounce,
    // });

    // await this.bidRepository.save(newBid);

    return true;
  }

  static async listAllBindsService(): Promise<Bid[]> {
    const bids = await this.bidRepository.find();

    return bids;
  }
}
export default BidService;
