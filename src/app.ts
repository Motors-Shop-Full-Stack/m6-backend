import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import cors from "cors";
import routesTest from "./routers";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middlewares";

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/test", routesTest);
app.use(handleAppErrorMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log("App runing");
});
export default app;
