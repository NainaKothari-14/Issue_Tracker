import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

/**
 * Create a project
 * POST /projects
 */
router.post("/", async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get all projects
 * GET /projects
 */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
