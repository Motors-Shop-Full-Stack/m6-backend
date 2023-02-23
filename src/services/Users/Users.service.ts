import AppDataSource from "../../data-source";
import { User } from "../../entities/User";
import { AppError } from "../../errors/AppError";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ICreateUser, IUpdateUser } from "../../interfaces/Users";

class UserService {
  static async createUsersService({
    name,
    email,
    password,
    cpf,
    cell,
    birthDate,
    accountType,
    cep,
    state,
    city,
    street,
    number,
    complement,
  }: ICreateUser): Promise<User> {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.find();

    findUser.map((user) => {
      if (user.email === email) {
        throw new AppError(400, "Email is already been used");
      } else if (user.cpf === cpf) {
        throw new AppError(400, "Cpf is already registered");
      } else if (user.cell) {
        throw new AppError(400, "Cellphone number is already registered");
      }
    });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      cell,
      birthDate,
      accountType,
      cep,
      state,
      city,
      street,
      number,
      complement,
    });

    await userRepository.save(newUser);

    return newUser;
  }

  static async listUsersService(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    const userResponse = await userRepository
      .createQueryBuilder("user")
      .select("user.id")
      .addSelect("user.name")
      .addSelect("user.email")
      .addSelect("user.cell")
      .addSelect("user.accountType")
      .getMany();

    return userResponse;
  }

  static async retrieveUserService(id: string): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    const userResponse = await userRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id: id })
      .select("user.id")
      .addSelect("user.name")
      .addSelect("user.email")
      .addSelect("user.cell")
      .addSelect("user.accountType")
      .leftJoinAndSelect("user.announcements", "announcements")
      .getMany();

    return userResponse;
  }

  static async updateUserService(id: string, data: IUpdateUser) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: id });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return userRepository.save({
      ...user, // existing fields
      ...data, // updated fields
    });
  }

  static async deleteUserService(id: string) {
    const manager = AppDataSource.getRepository(User);

    const user = await manager.findOneBy({ id: id });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    await manager.delete({ id: id });
  }
}
export default UserService;
