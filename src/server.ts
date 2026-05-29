import express from "express";
import { connectDB, sequelize } from "./config/db";
import adminRoutes from "./routes/admin.routes";
import { seedDemoAdmins } from "./config/seed-admins";
import bcrypt from "bcryptjs";
import "./models/associations";
import employeeRoutes from "./routes/employee_routes";
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import { seedDemoCustomer } from "./config/demo-customer";
import bookingRoutes from "./routes/booking.routes";
import receiptRoutes from "./routes/receipt.route";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = new Set(
  [
    process.env.FRONTEND_ORIGIN,
    "http://localhost:5500",
    "http://localhost:5173",
  ].filter(Boolean),
);

app.use(express.json());

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.has(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Vary", "Origin");
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("*", (_req, res) => {
  res.sendStatus(204);
});

app.get("/", (_req, res) => {
  res.json({
    message: "Travelmithra backend is running",
  });
});

// const password = "12345";

// bcrypt.hash(password, 10, (err, hash) => {
//   console.log(hash);
// });

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/receipt", receiptRoutes);

const startServer = async () => {
  const isConnected = await connectDB();

  if (isConnected) {
    await sequelize.sync({ alter: true });
    await seedDemoAdmins();
    await seedDemoCustomer();
  } else {
    console.warn(
      "Database unavailable. Admin API is running with demo admins only.",
    );
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
