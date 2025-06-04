import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";

const contactRoutes = (await import("./routes/contactRoutes.js")).default;

dotenv.config();
connectDb();
const app = express();

const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listing at PORT ${PORT}`);
});
