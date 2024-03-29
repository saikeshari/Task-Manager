import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from './routes/tasks.js';
import completeRoutes from './routes/complete.js';
import path from "path";

const app = express();

app.use(bodyParser.json({ extented: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(upload.array());
// app.use(express.static("public"));
connectDB();

app.use("/api/task", taskRoutes);
app.use("/api/complete", completeRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join("client/build")));
    app.get("*", (req,res) =>
    res.sendFile(path.resolve("client", "build", "index.html"))
    );
  } else {
    app.get("/", function (req, res) {
      res.send("Hello hi");
    });
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
