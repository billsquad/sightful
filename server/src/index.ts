import express, { Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import articleRoutes from "./routes/articles";
import userRoutes from "./routes/users";

const app = express();

dotenv.config({ path: __dirname + "/.env" });

app.use(express.json());
app.use(cors());
app.use("/articles", articleRoutes);
app.use("/users", userRoutes);

app.get("/", (_, res: Response) => {
  res.send("Sightful API");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(
    "mongodb+srv://user:user123@mycluster0.tukbr.mongodb.net/sightfuldb?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is listening at http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.error(error.message));
