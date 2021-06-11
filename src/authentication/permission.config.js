//Header
export const Access = {
    Admin: "ACCESS_ADMIN",
    User: "ACCESS_USER",
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
        }, Report: "Post.Comment.Report"
    },
    POST_DELETED_ALL_DELETE: "POST_DELETED_ALL_DELETE",
    POST_DELETED_ALL_READ: "POST_DELETED_ALL_READ",
    POST_DELETED_ALL_UPDATE: "POST_DELETED_ALL_UPDATE",
    POST_DELETED_SELF_DELETE: "POST_DELETED_SELF_DELETE",
    POST_PENDING_ALL_APPROVE: "POST_PENDING_ALL_APPROVE",
    POST_PENDING_SELF_CREATE: "POST_PENDING_SELF_CREATE",
    POST_PUBLIC_ALL_DELETE: "POST_PUBLIC_ALL_DELETE",
    POST_PUBLIC_ALL_LIKE: "POST_PUBLIC_ALL_LIKE",
    POST_PUBLIC_ALL_READ: "POST_PUBLIC_ALL_READ",
    POST_PUBLIC_ALL_SAVE: "POST_PUBLIC_ALL_SAVE",
    POST_PUBLIC_ALL_UPDATE: "POST_PUBLIC_ALL_UPDATE",
    POST_PUBLIC_SELF_DELETE: "POST_PUBLIC_SELF_DELETE",
    POST_PUBLIC_SELF_UPDATE: "POST_PUBLIC_SELF_UPDATE",
    POST_READ: "POST_READ",
    POST_UNLISTED_ALL_DELETE: "POST_UNLISTED_ALL_DELETE",
    POST_UNLISTED_ALL_LIKE: "POST_UNLISTED_ALL_LIKE",
    POST_UNLISTED_ALL_READ: "POST_UNLISTED_ALL_READ",
    POST_UNLISTED_ALL_SAVE: "POST_UNLISTED_ALL_SAVE",
    POST_UNLISTED_ALL_UPDATE: "POST_UNLISTED_ALL_UPDATE",
    POST_UNLISTED_SELF_CREATE: "POST_UNLISTED_SELF_CREATE",
    POST_UNLISTED_SELF_DELETE: "POST_UNLISTED_SELF_DELETE",
    POST_UNLISTED_SELF_UPDATE: "POST_UNLISTED_SELF_UPDATE",
    
}

export const PostAction = {
    Save: "save",
    Like: "like",
    Update: "update",
    Delete: "delete",
    Report: "report",
    Comment: "comment",
    Highlight: "highlight",
    Unhighlight: "unhighlight",
    StickToTop: "sticktotop",

}

