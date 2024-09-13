import {
    getPostComments,
    postPostComments,
    putPostComments,
    deletePostComments,
} from "../../services/postService/setPostComments.mjs";

export async function postComments(req, res) {
    const cno = req.query.cno;
    const order = req.query.order;
    const postId = req.query.postId;
    const comments = await getPostComments(postId, order, cno);
    res.json(comments);
}
export async function changeComment(req, res) {
    const data = req.body.comment;
    const postId = req.query.postId;
    const userId = req?.userId
    if (!userId) { return res.status(403).json({ message: "Forbidden: Invalid username" }); }
    if (!data) {
        return res.json({ statusCode: 400, message: "Invalid data" });
    }
    const result = await postPostComments(postId, userId, data);
    res.json(result);
}
export async function deleteComments(req, res) {
    const data = req.body.comment;
    const userId = req?.userId
    if (!userId) { return res.status(403).json({ message: "Forbidden: Invalid username" }); }
    const result = putPostComments(userId, data._id);
    res.json(result);
}
export async function deleteComment(req, res) {
    const userId = req?.userId
    if (!userId) { return res.status(403).json({ message: "Forbidden: Invalid username" }); }
    const data = req.body.comment;
    const postId = req.query.postId;
    const result = deletePostComments(postId, userId, data._id);
    res.json(result);
}


