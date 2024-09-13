import blogModel from "../../models/blogModel.mjs";

export const blogController = async (req, res) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const message = "This is Blog Page";
		const blogs = await blogModel
			.find()
			.skip((page - 1) * limit)
			.limit(Number(limit));
		const totalBlogs = await blogModel.countDocuments();
		const totalNumberOfPages = Math.ceil(totalBlogs / limit);
		res.status(200).json({
			statusCode: 200,
			message,
			blogs,
			totalNumberOfPages,
			totalBlogs,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			message: error.message,
		});
	}
};

export const postBlogController = async (req, res) => {
	try {
		const message = "This is Post Blog Page";
		const {
			title,
			content = "",
			description = "",
			author = "Anonymous",
			link = "",
		} = req.body;
		if(!title){
			res.status(400).json({statusCode : 400, message : 'title is required'})
		}
		else if(!content){
		  res.status(400).json({statusCode : 400, message : 'content is required'})
		}
		else if (title?.length < 5){
		  res.status(400).json({statusCode : 400, message : 'title should be atleast 5 characters'})
		}
		else if(description?.length > 50){
		  res.status(400).json({statusCode : 400, message : 'description should be less than 50 characters'})
		}
		else if(content?.length < 150){
		  res.status(400).json({statusCode : 400, message : 'content should be atleast 50 characters'})
		}
		const blog = new blogModel({
			title,
			description,
			content,
			author,
			link,
			createdAt: new Date(),
			updatedAt: new Date(),
			likes: 0,
			dislikes: 0,
		});
		await blog.save();
		res.status(201).json({
			message,
			blog,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			message: error.message,
		});
	}
};

export const getBlogController = async (req, res) => {
	try {
		const message = "This is Get Blog Page";
		const { id } = req.params;
		const blog = await blogModel.findById(id);
		if (!blog) {
			return res
				.status(404)
				.json({ message: "Blog not found" });
		}
		res.status(200).json({
			statusCode: 200,
			message,
			blog,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			message: error.message,
		});
	}
};

export const patchBlogController = async (req, res) => {
	try {
		const message = "This is Patch Blog Page";
		const { id } = req.params;
		const { likes, dislikes } = req.body;
		const blog = await blogModel.findByIdAndUpdate(
			id,
			{ $set: { likes, dislikes } },
			{ new: true }
		);
		if (!blog) {
			return res
				.status(404)
				.json({ message: "Blog not found" });
		}
		res.status(200).json({
			message,
			blog,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			message: error.message,
		});
	}
};

export const putBlogController = async (req, res) => {
	try {
		const message = "This is Put Blog Page";
		const { id } = req.params;
		const {
			title,
			description,
			author = "Anonymous",
			link = "",
		} = req.body;
		const blog = await blogModel.findByIdAndUpdate(
			id,
			{
				$set: {
					title,
					description,
					author,
					link,
					updatedAt: new Date(),
				},
			},
			{ new: true }
		);
		if (!blog) {
			return res
				.status(404)
				.json({ message: "Blog not found" });
		}
		res.status(200).json({
			message,
			blog,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			message: error.message,
		});
	}
};

export const deleteBlogController = async (req, res) => {
	try {
		const message = "This is Delete Blog Page";
		const { id } = req.params;
		const blog = await blogModel.findByIdAndDelete(id);
		if (!blog) {
			return res
				.status(404)
				.json({ message: "Blog not found" });
		}
		res.status(200).json({
			message,
		});
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			message: error.message,
		});
	}
};
