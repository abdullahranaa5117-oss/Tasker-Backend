  const express = require("express");
  const cors = require("cors");
  const dotenv = require("dotenv");
  const connectDB = require("./common/db");

  dotenv.config();

  const TaskRoutes = require('./Routes/Task.routes');
  const StatusRoutes = require('./Routes/Status.routes');
  const CategoryRoutes = require('./Routes/Category.routes');
  const UserRoutes = require('./Routes/User.routes');

  const app = express();

  app.use(cors({
    origin: process.env.CLIENT_URL ||"http://localhost:5173",
    credentials: true,
  }))

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/uploads', express.static('uploads'));


  app.use("/api/v1/task", TaskRoutes);
  app.use("/api/v1/status", StatusRoutes);
  app.use("/api/v1/category", CategoryRoutes);
  app.use("/api/v1/user", UserRoutes);

  app.get("/", (req, res) => {
    res.send("Task Manager Backend Running!");
  });

  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 5000;

  app.listen(port, host, async () => {
    await connectDB();
    console.log(`Server running at http://${host}:${port}`);
  });
