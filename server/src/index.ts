import express from "express";
import morgan from "morgan";
import cors from "cors";

const SERVER_PORT = 4000;

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.get("/api-health", (req, res, next) => {
  res.status(200).json({
    message: "api oker",
  });
});

app.post("/api/v1/auth/signin", (req, res, next) => {
  const data = req.body;
  if (
    data.email == "dothanhnhutis@gmail.com" &&
    data.password == "@Bietdoi113"
  ) {
    res.setHeader("Set-Cookie", "session=signinok");
    return res.status(200).json({ message: "User signin successful." });
  }
  return res.status(400).json({
    message: "Invalid credential",
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`server has started with process id ${process.pid}`);
  console.log(`server running on port ${SERVER_PORT}`);
});
