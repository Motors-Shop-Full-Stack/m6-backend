import { Router } from "express";
import Test from "../controllers";

const routesTest = Router();

routesTest.get("", Test.testController);

export default routesTest;
