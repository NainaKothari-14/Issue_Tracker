import express from "express";
import { Issue, User, Project } from "../models/index.js";

const router = express.Router();

/**
 * Create an issue
 * POST /api/issues
 */
router.post("/", async (req, res) => {
  try {
    const issue = await Issue.create({
      title: req.body.title,
      description: req.body.description,
      ProjectId: req.body.projectId,
      reporterId: req.body.reporterId,
      assigneeId: req.body.assigneeId,
      status: req.body.status || "OPEN"
    });

    res.status(201).json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get issues by project (WITH JOINS 🔥)
 * GET /api/issues/project/:projectId
 */
router.get("/project/:projectId", async (req, res) => {
  try {
    const issues = await Issue.findAll({
      where: { ProjectId: req.params.projectId },
      include: [
        { model: User, as: "Reporter", attributes: ["id", "name", "email"] },
        { model: User, as: "Assignee", attributes: ["id", "name", "email"] },
        { model: Project, attributes: ["id", "name"] },
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Update issue status
 * PATCH /api/issues/:id/status
 */
router.patch("/:id/status", async (req, res) => {
  try {
    const issue = await Issue.findByPk(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.status = req.body.status;
    await issue.save();

    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;