import express, { Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import articleRoutes from "./routes/articles";

const app = express();

dotenv.config({ path: __dirname + "/.env" });

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/articles", articleRoutes);

app.get("/", (_, res: Response) => {
  res.send("Sightful API");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is listening at http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.error(error.message));
