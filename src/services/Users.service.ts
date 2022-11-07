import AppDataSource from "../data-source"
import { User } from "../entities/User";
import { AppError } from "../errors/AppError";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface ICreateUser {
  name: string
  email: string
  password: string
  cpf: string
  cel: string
  birthdate: any
  cep: string
  state: string
  city: string
  street: string
  number: number
  complement: string
  is_active?: boolean
}

interface ILoginUser {
  email: string,
  password: string
}

class UserService {
  static async listUsersService() {
    const manager = AppDataSource.getRepository(User)
    const users = manager.find()
    return users
  }

  static async createUsersService(data: ICreateUser) {
    const manager = AppDataSource.getRepository(User)

    const findUser = await manager.findOneBy({
      email: data.email,
    });

    if (findUser) {
      throw new AppError(400, "Email is already been used");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    data.password = hashedPassword

    const user = manager.create(data)

    await manager.save(user)

    return user
  }

  static async loginUserService(data: ILoginUser) {
    const manager = AppDataSource.getRepository(User)
    const client = await manager.findOneBy({
      email: data.email,
    });
  
    if (!client) {
      throw new AppError(400, "Email or password is incorrect");
    }
  
    const passwordCompare = bcrypt.compareSync(
      data.password,
      client.password
    );
  
    if (!passwordCompare) {
      throw new AppError(400, "Email or password is incorrect");
    }
  
    const token = jwt.sign(
      {
        id: client.id,
        email: client.email,
        isActive: client.is_active
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );
    return {token};
  }

}
export default UserService;