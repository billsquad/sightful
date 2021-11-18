import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import articleRoutes from "./routes/articles";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/articles", articleRoutes);

const PORT = 5000;
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is listening at http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.error(error.message));
