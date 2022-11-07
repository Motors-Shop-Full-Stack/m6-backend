import { Router } from "express";
import UserController from "../controllers/Users.controller";


const usersRoute = Router();

usersRoute.get("", UserController.listUserController);
usersRoute.post("", UserController.createUserController);
usersRoute.post("/login", UserController.loginUserController)

export default usersRoute;