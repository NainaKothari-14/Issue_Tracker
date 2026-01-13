import sequelize from "../config/sequelize.js";
import User from "./User.js";
import Project from "./Project.js";
import Issue from "./Issue.js";

// Define associations

// Project has many Issues
Project.hasMany(Issue, {
  foreignKey: "ProjectId",
  onDelete: "CASCADE"
});

Issue.belongsTo(Project, {
  foreignKey: "ProjectId"
});

// User associations with Issue (Reporter)
User.hasMany(Issue, {
  foreignKey: "reporterId",
  as: "ReportedIssues"
});

Issue.belongsTo(User, {
  foreignKey: "reporterId",
  as: "Reporter"
});

// User associations with Issue (Assignee)
User.hasMany(Issue, {
  foreignKey: "assigneeId",
  as: "AssignedIssues"
});

Issue.belongsTo(User, {
  foreignKey: "assigneeId",
  as: "Assignee"
});

export { sequelize, User, Project, Issue };