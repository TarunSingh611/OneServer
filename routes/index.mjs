import BearerAuth from "../middleware/bearerAuth.mjs";
import JWTAuth from "../middleware/jwtAuth.mjs";
import homeRoutes from "./homeRoutes.mjs";
import guestRoutes from "./guestRoutes.mjs";
import resumeRoutes from "./resumeRoutes.mjs";
import projectRoutes from "./projectRoutes.mjs";
import blogRoutes from "./blogRoutes.mjs";
import exploreRoutes from "./exploreRoutes.mjs";
import settingRoutes from "./settingRoutes.mjs";
import problemRoutes from "./problemRoutes.mjs";
import solutionRoutes from "./solutionRoutes.mjs";
import discussRoutes from "./discussRoutes.mjs";
import miscRoutes from "./miscRoutes.mjs";
import authentication from "./authRoutes.mjs";
import userRoutes from "./userRoutes.mjs";
import portfolioRoutes from "./portfolioRoutes.mjs";
import reactionRoutes from "./reactionRoutes.mjs";
import feedRoutes from "./feedRoutes.mjs"

export default function initializeRoutes(app) {
	app.use(BearerAuth);
	app.use("/guest", guestRoutes);
	app.use(JWTAuth);
	app.use("/", homeRoutes);
	app.use("/portfolio", portfolioRoutes);
	app.use("/auth", authentication)
	app.use ("/misc" , miscRoutes)
	app.use("/resume", resumeRoutes);
	app.use("/projects", projectRoutes);
	app.use("/discuss", discussRoutes);
	app.use("/blogs", blogRoutes);
	app.use("/explore", exploreRoutes);
	app.use("/problems", problemRoutes);
	app.use("/solutions", solutionRoutes);
	app.use("/user", userRoutes);
	app.use("/reaction", reactionRoutes);
	app.use("/settings", settingRoutes)
	app.use("/feed", feedRoutes)

	app.use("*", (req, res) => {
		res.status(404).json({
			message: "Not Found",
		});
	});
}
