import Discussion from "../../models/discussQModel.mjs";
import Reply from "../../models/discussRModel.mjs";

// Add a reply to a discussion
export const addReply = async (req, res) => {
    const { content } = req.body;
    const reply = new Reply({ discussionId: req.params.id, content });
    try {
        const newReply = await reply.save();
        const discussion = await Discussion.findById(req.params.id);
        discussion.replies.push(newReply);
        await discussion.save();
        res.status(201).json(newReply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a reply
export const deleteReply = async (req, res) => {
    try {
        const reply = await Reply.findById(req.params.replyId);
        if (!reply) return res.status(404).json({ message: 'Reply not found' });

        await reply.remove();
        const discussion = await Discussion.findById(req.params.discussionId);
        discussion.replies.pull(req.params.replyId);
        await discussion.save();
        res.json({ message: 'Reply deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
