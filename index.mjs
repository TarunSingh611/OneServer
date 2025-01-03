// index.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import { Server as socketIO } from "socket.io";
import initializeSocketIO from "./sockets/index.mjs";
import initializeRoutes from "./routes/index.mjs";
import swaggerUi from "swagger-ui-express";
import { statusHTML } from './statusHTML.mjs';
const swaggerDocument = await import('./swagger-output.json', { assert: { type: 'json' } }).then(module => module.default);

const app = express();
const server = http.createServer(app);
const io = new socketIO(server, {
	cors: {
		origin: "*",
		methods: [
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
			"PATCH",
			"HEAD",
			"CONNECT",
			"TRACE",
		],
		credentials: true,
	},
});

const MONGO_URI_FULL = process.env.MONGO_URI_FULL;
app.use(cors("*"));
app.use(express.json());
app.use("/public", express.static("public"));
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument)
);

mongoose.connect(MONGO_URI_FULL);
app.get('/', (req, res) => { res.send(statusHTML); });
initializeSocketIO(io);
initializeRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		`Server is running on port ${PORT} click here: http://localhost:${PORT}` +
			`\nSwagger Documentation: http://localhost:${PORT}/api-docs`
	);
});
