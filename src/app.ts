import "dotenv/config";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use();
app.use();

app.listen(process.env.PORT || 3000, () => {
  console.log("App runing");
});
export default app;
