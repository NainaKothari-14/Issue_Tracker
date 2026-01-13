import express from "express";
import cors from "cors";

import projectRoutes from "./routes/project.routes.js";
import issueRoutes from "./routes/issue.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/issues", issueRoutes);

export default app;
