import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
    discussionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
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
});

const Reply = mongoose.model('Reply', ReplySchema);
export default Reply;