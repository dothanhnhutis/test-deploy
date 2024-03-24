"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const SERVER_PORT = 4000;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));
app.use(express_1.default.json({ limit: "200mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "200mb" }));
app.get("/api-health", (req, res, next) => {
    res.status(200).json({
        message: "api oker",
    });
});
app.post("/api/v1/auth/signin", (req, res, next) => {
    const data = req.body;
    if (data.email == "dothanhnhutis@gmail.com" &&
        data.password == "@Bietdoi113") {
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
