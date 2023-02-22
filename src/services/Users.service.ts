import AppDataSource from "../data-source";
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ICreateUser, ILoginUser, IUpdateUser } from "../interfaces/Users";

class UserService {
  static async listUsersService() {
    const manager = AppDataSource.getRepository(User);
    const users = manager.find();
    return users;
  }

  static async createUsersService({
    name,
    email,
    password,
    cpf,
    cell,
    birthdate,
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
      birthdate,
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

  static async loginUserService(data: ILoginUser) {
    const manager = AppDataSource.getRepository(User);
    const user = await manager.findOneBy({
      email: data.email,
    });

    if (!user) {
      throw new AppError(400, "Email or password is incorrect");
    }

    const passwordCompare = bcrypt.compareSync(data.password, user.password);

    if (!passwordCompare) {
      throw new AppError(400, "Email or password is incorrect");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isActive: user.is_active,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );

    return { token, userId: user.id };
  }

  static async retrieveUserService(id: string) {
    const manager = AppDataSource.getRepository(User);
    const user = await manager.findOne({
      where: { id: id },
      relations: ["announcements"],
    });

    if (!user) {
      throw new AppError(404, "Client not found");
    }

    return user;
  }

  static async deleteUserService(id: string) {
    const manager = AppDataSource.getRepository(User);

    const user = await manager.findOneBy({ id: id });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    await manager.delete({ id: id });
  }

  static async updateUserService(id: string, data: IUpdateUser) {
    const manager = AppDataSource.getRepository(User);
    const user = await manager.findOneBy({ id: id });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return manager.save({
      ...user, // existing fields
      ...data, // updated fields
    });
  }
}
export default UserService;
