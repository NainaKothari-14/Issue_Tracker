import express from "express";
import cors from "cors";
import { sequelize } from "./src/models/index.js";
import ProjectRoutes from "./src/routes/project.routes.js";
import IssueRoutes from "./src/routes/issue.routes.js";
import UserRoutes from "./src/routes/user.routes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));

app.use(express.json());

// Routes
app.use("/api/projects", ProjectRoutes);
app.use("/api/issues", IssueRoutes);
app.use("/api/users", UserRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connected");

    // Drop all tables and recreate them
    await sequelize.sync({ force: true, alter: false });
    console.log("✅ All tables dropped and recreated with proper associations");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();