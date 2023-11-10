import mongoose from 'mongoose';
import { url } from "../config/db.config.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

import "./user.model.js";
import role from "./role.model.js";
db.role = role;

db.url = url;

db.ROLES = ["user", "admin", "farmer"];

export default db;
