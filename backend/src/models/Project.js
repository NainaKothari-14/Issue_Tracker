import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "Projects",
  timestamps: true,
});

export default Project;