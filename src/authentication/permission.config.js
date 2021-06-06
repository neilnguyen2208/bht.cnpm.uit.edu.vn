//Header
export const Access = {
    Admin: "Access.Admin",
}
//Post permission
export const Post = {
    SetSaveStatus: "Post.SetSaveStatus",
    SetLikeStatus: "Post.SetLikeStatus",
    Create: "Post.Create",
    Comment: {
        Create: "Post.Comment.Create",
        Edit: "Post.Comment.Edit",
        Delete: "Post.Comment.Delete",
        Reply: {
            Create: "Post.Comment.Reply.Create",
            Edit: "Post.Comment.Reply.Edit",
            Delete: "Post.Comment.Reply.Delete",
            SetLikeStatus: "Post.Comment.Reply.SetLikeStatus",
        },
        SetLikeStatus: "Post.Comment.SetLikeStatus",
    }
}

export const PostFixedStatus = {
    Deleted: "POST_DELETED",
    Public: "POST_PUBLIC",
    Private: "POST_PRIVATE",
}