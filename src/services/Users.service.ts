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

interface IUpdateUser {
  name?: string
  email?: string
  password?: string
  cpf?: string
  cel?: string
  birthdate?: any
  cep?: string
  state?: string
  city?: string
  street?: string
  number?: number
  complement?: string
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

    const findUserByEmail = await manager.findOneBy({
      email: data.email,
    });

    const findUserByCpf = await manager.findOneBy({
      cpf: data.cpf,
    });

    const findUserByCel = await manager.findOneBy({
      cel: data.cel,
    });

    if (findUserByEmail) {
      throw new AppError(400, "Email is already been used");
    }

    if (findUserByCpf) {
      throw new AppError(400, "Cpf is already registered");
    }

    if (findUserByCel) {
      throw new AppError(400, "Cellphone number is already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    data.password = hashedPassword

    const user = manager.create(data)

    await manager.save(user)

    return user
  }

  static async loginUserService(data: ILoginUser) {
    const manager = AppDataSource.getRepository(User)
    const user = await manager.findOneBy({
      email: data.email,
    });
    
    if (!user) {
      throw new AppError(400, "Email or password is incorrect");
    }

    const passwordCompare = bcrypt.compareSync(
      data.password,
      user.password
      );
      
      if (!passwordCompare) {
        throw new AppError(400, "Email or password is incorrect");
      }
      
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          isActive: user.is_active
        },
        process.env.SECRET_KEY as string,
        {
          expiresIn: "24h",
        }
        );

    return { token, userId: user.id };
  }

  static async retrieveUserService(id: string) {
    const manager = AppDataSource.getRepository(User)
    const user = await manager.findOne({where: { id: id }, relations:["announcements"]})

    if (!user) {
      throw new AppError(404, "Client not found")
    }

    return user
  }

  static async deleteUserService(id: string) {
    const manager = AppDataSource.getRepository(User)

    const user = await manager.findOneBy({ id: id })

    if (!user) {
      throw new AppError(404, "User not found")
    }

    await manager.delete({ id: id })
  }

  static async updateUserService(id: string, data: IUpdateUser) {

    const manager = AppDataSource.getRepository(User)
    const user = await manager.findOneBy({ id: id })

    if (!user) {
      throw new AppError(404, "User not found")
    }

    return manager.save({
      ...user, // existing fields
      ...data // updated fields
    })

  }

}
export default UserService;