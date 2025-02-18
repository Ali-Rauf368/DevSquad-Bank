import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from './routes/userRoutes.js';

import adminRoutes from "./routes/adminRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import insightsRoutes from "./routes/insightsRoutes.js";
import rewardsRoutes from "./routes/rewardsRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import bodyParser from "body-parser";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import fraudRoutes from "./routes/fraudRoutes.js";
import marketingRoutes from './routes/marketingRoutes.js';
import financeRoutes from "./routes/financeRoutes.js";
import transactionRoutes from './routes/transactionRoutes.js';
import aboutUsRoutes from "./routes/AboutUsRoutes.js";
/* 
import http from "http"; // For creating an HTTP server
import { Server } from "socket.io"; // For real-time communication */

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/rewards", rewardsRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/fraud", fraudRoutes);
app.use("/api/marketing", marketingRoutes);
app.use("/api/finance", financeRoutes);
app.use('/api/transactions', transactionRoutes);
app.use("/api/aboutus", aboutUsRoutes); 
app.use(errorHandler);
/* 
// Create an HTTP server
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST'],
  },
});

// Socket.IO event handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a chat room
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });

  // Handle sending a message
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    // Notify the receiver in their room
    io.to(receiverId).emit("receiveMessage", { senderId, message });
    console.log(`Message from ${senderId} to ${receiverId}: ${message}`);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
}); */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});