import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Issue = sequelize.define("Issue", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("OPEN", "IN PROGRESS", "RESOLVED", "CLOSED"),
    defaultValue: "OPEN",
  },
  ProjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reporterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  assigneeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "Issues",
  timestamps: true,
});

export default Issue;