import express from "express";
import cors from "cors";
import { createUser, deleteUser, updateUser } from "./routes/users";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.route("/api/users").post(createUser).put(updateUser).delete(deleteUser);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: "Something broke!",
    });
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
