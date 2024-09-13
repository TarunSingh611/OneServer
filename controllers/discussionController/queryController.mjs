import Discussion from "../../models/discussQModel.mjs";

// Get all discussions
export const getDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find().populate('replies');
        res.json(discussions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single discussion
export const getDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id).populate('replies');
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });
        res.json(discussion);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new discussion
export const createDiscussion = async (req, res) => {
    const { title, content } = req.body;
    const discussion = new Discussion({ title, content });
    try {
        const newDiscussion = await discussion.save();
        res.status(201).json(newDiscussion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a discussion
export const updateDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        discussion.title = req.body.title || discussion.title;
        discussion.content = req.body.content || discussion.content;

        const updatedDiscussion = await discussion.save();
        res.json(updatedDiscussion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a discussion
export const deleteDiscussion = async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        if (!discussion) return res.status(404).json({ message: 'Discussion not found' });

        await discussion.remove();
        res.json({ message: 'Discussion deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
