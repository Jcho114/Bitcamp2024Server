import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import { Server } from "socket.io";
import http from "http";
import userRouter from "./modules/users/users.router";
import authRouter from "./modules/auth/auth.router";
import appointmentRouter from "./modules/appointments/appointments.router";
import threadRouter from "./modules/threads/threads.router";

dotenv.config();

export const app: Express = express();
const PORT = process.env.PORT || 3001;

// Cors
const allowedOrigins = [process.env.ORIGIN as string, "https://peersphereuniv.netlify.app/"];
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
};
app.use(express.json());
app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, \
              Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});

const server = http.createServer(app);

// API Logging
app.use(morgan('tiny'));

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Hello World!");
});

// Routers
app.use("/auth", authRouter)
app.use("/users", userRouter);
app.use("/appointments", appointmentRouter);
app.use("/threads", threadRouter);

// Error handling middleware
// Keep at bottom above server instantiation
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error.message);
  res.status(500).json({
    message: error.message,
  });
});

server.listen(PORT, () => {
  console.log(`[server]: server started on port ${PORT}`);
});

// SocketIO
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  }
});

const teachEndpoint = io.of("/teach");

teachEndpoint.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("joinRoom", (data) => {
    console.log("joinRoom", data);
    socket.join(data[0]);
  });

  socket.on("callUser", (data) => {
    console.log("callUser");
    socket.to(data.roomId).emit("callUser", {signal: data.signal, from: data.from, name: data.name});
  });

  socket.on("answerCall", (data) => {
    console.log("answerCall");
    socket.to(data.roomId).emit("callAccepted", data.signal);
  });

  socket.on("message", (data) => {
    socket.to(data.roomId).emit("message", data.name, data.content);
  });
});

server.on('close', async () => {
});

process.on('SIGINT', async () => {
  server.close();
});

// Additional exception handler
process.on('uncaughtException', (err: Error) => {
  console.error('\x1b[31m[error]: ' + err.message + '\x1b[37m');
});
