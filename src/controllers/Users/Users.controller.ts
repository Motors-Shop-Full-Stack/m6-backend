import { Request, Response } from "express";
import UserService from "../../services/Users.service";

class UserController {
  static async listUserController(req: Request, res: Response) {
    const users = await UserService.listUsersService();
    return res.status(200).json(users);
  }

  static async createUserController(req: Request, res: Response) {
    const {
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
    } = req.body;

    const newUser = await UserService.createUsersService({
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
    });

    return res.status(201).json(newUser);
  }

  static async loginUserController(req: Request, res: Response) {
    const token = await UserService.loginUserService(req.body);
    return res.status(200).json(token);
  }

  static async retrieveUserController(req: Request, res: Response) {
    const user = await UserService.retrieveUserService(req.params.id);

    return res.status(200).json(user);
  }

  static async deleteUserController(req: Request, res: Response) {
    await UserService.deleteUserService(req.params.id);

    return res.status(204).json({ message: "User deleted" });
  }

  static async updateUserController(req: Request, res: Response) {
    const user = await UserService.updateUserService(req.params.id, req.body);
    return res.status(200).json(user);
  }
}

export default UserController;
