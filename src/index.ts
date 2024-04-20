import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import { Server } from "socket.io";
import http from "http";
import userRouter from "./modules/users/users.router";

dotenv.config();

export const app: Express = express();
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

// API Logging
app.use(morgan('tiny'));

// Cors
const allowedOrigins = ['http://localhost:3000'];
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
};
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Hello World!");
});

app.use("/users", userRouter);

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
const io = new Server(server);

const testEndpoint = io.of("/test");

testEndpoint.on("connection", (socket) => {
  console.log("client connected to /test endpoint");
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
