import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRouter);
app.use("/users", usersRouter);
const CONNECTION_URL = "mongodb+srv://terminaleagle:TzN7X8MG8iTfD46X@datacluster.fptcmom.mongodb.net/memories?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
