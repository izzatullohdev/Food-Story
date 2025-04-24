// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/errorHandler";
// Routes import
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import partnerRoutes from "./routes/partnerRoutes";
import contactRoutes from "./routes/contactRoutes";
import priceRequestRoutes from "./routes/priceRequestRoutes";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());
// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/contact", contactRoutes);

app.use("/api/price-request", priceRequestRoutes);

// Default route
app.get("/", (_req, res) => {
  res.send("🚀 API ishlayapt");
});
// Global error handling middleware
app.use(globalErrorHandler);
export default app;
