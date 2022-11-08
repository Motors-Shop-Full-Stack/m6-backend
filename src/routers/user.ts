import { Router } from "express";
import UserController from "../controllers/Users.controller";
import VerifyAccountOwner from "../middlewares/authentication/verifyAccountOwner";
import VerifyToken from "../middlewares/authentication/verifyToken";


const usersRoute = Router();

usersRoute.get("", UserController.listUserController);
usersRoute.post("", UserController.createUserController);
usersRoute.post("/login", UserController.loginUserController)
usersRoute.get("/:id", VerifyToken, UserController.retrieveUserController)
usersRoute.patch("/:id", VerifyToken, VerifyAccountOwner, UserController.updateUserController)
usersRoute.delete("/:id", VerifyToken, VerifyAccountOwner, UserController.deleteUserController)

export default usersRoute;