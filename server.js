import express from "express";
import cors from "cors";
import { json, urlencoded } from "express";
import db from "./models/index.js";
import Role from "./models/role.model.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({ extended: true }));

const role = db.role;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "farmer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Farmer' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.get("/", (req, res) => {
  res.json({ message: "hello ." });
});

authRoutes(app);
userRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
