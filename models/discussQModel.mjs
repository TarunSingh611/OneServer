import mongoose from 'mongoose';

const DiscussionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
    }],
});

const DiscussQ = mongoose.model('Discussion', DiscussionSchema);
export default DiscussQ
