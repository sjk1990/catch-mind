import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);

const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

// socket은 http와 달리 페이지가 없고 연결만 있음. io가 모든 이벤트를 감지해야 함.
const io = socketIO(server);

io.on("connection", (socket) => socketController(socket));
