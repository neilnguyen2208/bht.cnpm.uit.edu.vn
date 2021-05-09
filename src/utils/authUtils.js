import { authServices } from 'redux/services/authServices'

const PermissionList = {
    ContentManagement: {
        Collaborator: { Collaborator: "COLLABORATOR" },
        Admin: { Admin: "ADMIN" }
    },
    Document: {

        Upload: { DocumentUpload: "DOCUMENT_UPLOAD" }, //gain this permission to upload a document.
        Edit: { DocumentEdit: "DOCUMENT_EDIT" }, //gain this permission to edit information of an uploaded document.
        Delete: { DocumentDelete: "DOCUMENT_DELETE" }, //gain this permission to delete an uploaded document.
        Approve: { DocumentApprove: "DOCUMENT_APPROVE" }, //gain this permission to approve a document uploaded by user.  
        Download: { DocumentDownload: "DOCUMENT_DOWNLOAD" }, //gain this permission to download an uploaded document. 
        Preview: { DocumentPreview: "DOCUMENT_PREVIEW" }, //gain this permission to preview a document uploaded by user (view a unapproved document).  

        All: { //Gain all document permission
            DocumentUpload: "DOCUMENT_UPLOAD",
            DocumentEdit: "DOCUMENT_EDIT",
            DocumentDelete: "DOCUMENT_DELETE",
            DocumentApprove: "DOCUMENT_APPROVE",
            DocumentDownload: "DOCUMENT_DOWNLOAD",
            DocumentPreview: "DOCUMENT_PREVIEW"
        }
    },
    Post:
    {
        Create: { PostCreate: "POST_CREATE" },  //gain this permission to write a post.
        Edit: { PostEdit: "POST_EDIT" }, //gain this permission to edit an uploaded post.
        Delete: { PostDelete: "POST_DELETE" }, //gain this permission to delete an uploaded post.
        Approve: { PostApprove: "POST_APPROVE" },
        Comment: { PostComment: "POST_COMMENT" },
        Like: { PostLike: "POST_LIKE" },
        Save: { PostSave: "POST_SAVE" },

        All: {
            PostCreate: "POST_CREATE",
            PostEdit: "POST_EDIT",
            PostDelete: "POST_DELETE",
            PostApprove: "POST_APPROVE",
            PostComment: "POST_COMMENT",
            PostLike: "POST_LIKE",
            PostSave: "POST_SAVE"
        }
    },
    Category: {

        View: { CategoryView: "CATEGORY_VIEW" },
        All: {
            CategoryView: "CATEGORY_VIEW",
            DocCategoryAdd: "DOCUMENT_CATEGORY_ADD",
            DocCategoryEdit: "DOCUMENT_CATEGORY_EDIT",
            PostCategoryAdd: "POST_CATEGORY_ADD",
            PostCategoryEdit: "POST_CATEGORY_EDIT",
            SubjectCategoryAdd: "SUBJECT_CATEGORY_ADD",
            SubjectCategoryEdit: "SUBJECT_CATEGORY_EDIT",
            SemesterCategoryAdd: "SEMESTER_CATEGORY_ADD",
            SemesterCategoryEdit: "SEMESTER_CATEGORY_EDIT",
        },
        DocCategory: {
            Add: { DocCategoryAdd: "DOCUMENT_CATEGORY_ADD" },
            Edit: { DocCategoryEdit: "DOCUMENT_CATEGORY_EDIT" },
            All: {
                DocCategoryAdd: "DOCUMENT_CATEGORY_ADD",
                DocCategoryEdit: "DOCUMENT_CATEGORY_EDIT"
            }
        },
        PostCategory:
        {
            Add: { PostCategoryAdd: "POST_CATEGORY_ADD" },
            Edit: { PostCategoryEdit: "POST_CATEGORY_EDIT" },
            All: {
                PostCategoryAdd: "POST_CATEGORY_ADD",
                PostCategoryEdit: "POST_CATEGORY_EDIT",
            }
        },
        SubjectPermission:
        {
            Add: { SubjectCategoryAdd: "SUBJECT_CATEGORY_ADD" },
            Edit: { SubjectCategoryEdit: "SUBJECT_CATEGORY_EDIT" },
            All: {
                SubjectCategoryAdd: "SUBJECT_CATEGORY_ADD",
                SubjectCategoryEdit: "SUBJECT_CATEGORY_EDIT",
            }
        },
        SemesterPermission: {
            Add: { SemesterCategoryAdd: "SEMESTER_CATEGORY_ADD" },
            Edit: { SemesterCategoryEdit: "SEMESTER_CATEGORY_EDIT" },
            All: {
                SemesterCategoryAdd: "SEMESTER_CATEGORY_ADD",
                SemesterCategoryEdit: "SEMESTER_CATEGORY_EDIT",
            }
        },
    },
    Role:
    {
        Add: { RoleAdd: "ROLE_ADD" },
        Edit: { RoleEdit: "ROLE_EDIT" },
        Delete: { RoleDelete: "ROLE_DELETE" },
        All: {
            RoleAdd: "ROLE_ADD",
            RoleEdit: "ROLE_EDIT",
            RoleDelete: "ROLE_DELETE",
        }
    },
    Activity:
    {
        View: { ActivityView: "ACTIVITY_VIEW" },
        // Add: { ActivityAdd: "ACTIVITY_ADD" },
        // Edit: { ActivityEdit: "ACTIVITY_EDIT" },
        Delete: { ActivityDelete: "ACTIVITY_DELETE" },
        Approve: { ActivityApprove: "ACTIVITY_APPROVE" },
        All: {
            ActivityView: "ACTIVITY_VIEW",
            // ActivityAdd: "ACTIVITY_ADD",
            // ActivityEdit: "ACTIVITY_EDIT",
            ActivityDelete: "ACTIVITY_DELETE",
            ActivityApprove: "ACTIVITY_APPROVE"
        }
    },
    User: //interact to list of all user in the system, or another user
    {
        View: { UserView: "USER_VIEW" },
        Edit: { USerEdit: "USER_EDIT" },
        Ban: { UserDelete: "USER_BAN" },
        ChangePass: { UserChangePass: "USER_CHANGE_PASS" },
        DeletePost: { UserDeletePost: "USER_DELETE_POST" },
        DeleteDoc: { UserDeleteDoc: "USER_DELETE_DOC" },
        EditDoc: { UserEditDoc: "USER_EDIT_DOC" },
        EditPost: { UserEditPost: "USER_EDIT_POST" },
        ChangeRole: { UserChangeRole: "USER_CHANGE_ROLE" },
        Report: { UserReport: "USER_REPORT" },

        All: {
            UserView: "USER_VIEW",
            UserEdit: "USER_EDIT",
            UserBan: "USER_BAN",
            UserChangePass: "USER_CHANGE_PASS",
            UserDeletePost: "USER_DELETE_POST",
            UserDeleteDoc: "USER_DELETE_DOC",
            UserEditDoc: "USER_EDIT_DOC",
            UserEditPost: "USER_EDIT_POST",
            UserChangeRole: "USER_CHANGE_ROLE",
            UserReport: "USER_REPORT"
        }
    },
    Account: //interact to own account
    {
        Edit: { AccountEdit: "ACCOUNT_EDIT" },
        ChangePass: { AccountChangePass: "ACCOUNT_CHANGE_PASS" },
        DeletePost: { AccountDeletePost: "ACCOUNT_DELETE_POST" },
        DeleteDoc: { AccountDeleteDoc: "ACCOUNT_DELETE_DOC" },
        PreviewDoc: { AccountPreviewDoc: "ACCOUNT_PREVIEW_DOC" },
        PreviewPost: { AccountPreviewPost: "ACCOUNT_PREVIEW_POST" },
        All: {
            AccountEdit: "ACCOUNT_EDIT",
            AccountChangePass: "ACCOUNT_CHANGE_PASS",
            AccountDeletePost: "ACCOUNT_DELETE_POST",
            AccountDeleteDoc: "ACCOUNT_DELETE_DOC",
            AccountPreviewDoc: "ACCOUNT_PREVIEW_DOC",
            AccountPreviewPost: "ACCOUNT_PREVIEW_POST"
        }
    },
    Notification: //interact to own account
    {
        Edit: { NotificationEdit: "NOTIFICATION_EDIT" },
        Add: { NotificationAdd: "NOTIFICATION_ADD" },
        Delete: { NotificationDelete: "NOTIFICATION_DELETE" },
        Set: { NotificationSet: "NOTIFICATION_SET" },
        UnsetAny: { NotificationUnsetAny: "NOTIFICATION_UNSET_ANY" },
        ViewAll: { NotificationViewAll: "NOTIFICATION_VIEW_ALL" }, //View in table

        All: {
            NotificationEdit: "NOTIFICATION_EDIT",
            NotificationAdd: "NOTIFICATION_ADD",
            NotificationDelete: "NOTIFICATION_DELETE",
            NotificationSet: "NOTIFICATION_SET",
            NotificationUnsetAny: "NOTIFICATION_UNSET_ANY",
            NotificationViewAll: "NOTIFICATION_VIEW_ALL"
        }
    },
    Statistic: //to view and manage all Statistic of page
    {
        View: { StatisticView: "Statistic_VIEW" }
    }
}

export function getRoleNameByName(roleName) {
    if (roleName === "ADMIN")
        return "Admin";
    if (roleName === "USER")
        return "User";
    if (roleName === "COLLABORATOR")
        return "Collaborator";
    return "Guest";
}


export function getRoleNameFilterByName(roleName) {
    if (roleName === "ADMIN")
        return "Admin";
    if (roleName === "USER")
        return "User";
    if (roleName === "COLLABORATOR")
        return "Collaborator";
    return "All";
}


export function getRoleNamebyID(roleId) {
    if (roleId === 1)
        return "Admin";
    if (roleId === 2)
        return "Collaborator";
    if (roleId === 3)
        return "User";
    return "Guest";
}

//to use this function, class use this must have 
export const isGrantedPermissions = function (permissionList) {
    return true;
}

export function logAllPermissionByRoleName(roleName) {
    if (roleName === "ADMIN") {

        return;
    }
    if (roleName === "USER") {

        return;
    }
    if (roleName === "COLLABORATOR") {

        return;
    }

}


//config:
const ADMIN = {
    ...PermissionList.ContentManagement.Admin,
    ...PermissionList.Account.All,
    ...PermissionList.Document.All,
    ...PermissionList.Post.All,
    ...PermissionList.Activity.All,
    ...PermissionList.Category.All,
    ...PermissionList.Role.All,
    ...PermissionList.User.All,
    ...PermissionList.Notification.All

}

const COLLABORATOR = {
    ...PermissionList.Account.All,
    ...PermissionList.ContentManagement.Collaborator,
    ...PermissionList.Document.Upload,
    ...PermissionList.Document.Download,
    ...PermissionList.Document.Approve,
    ...PermissionList.Document.Preview,
    ...PermissionList.Post.Comment,
    ...PermissionList.Post.Save,
    ...PermissionList.Post.Like,
    ...PermissionList.Post.Create,
    ...PermissionList.Post.Approve,
    ...PermissionList.Post.Preview,
}

const USER = {
    ...PermissionList.Document.Upload,
    ...PermissionList.Document.Download,
    ...PermissionList.Account.All,
    ...PermissionList.Post.Comment,
    ...PermissionList.Post.Save,
    ...PermissionList.Post.Like,
    ...PermissionList.Post.Create,
}


export const getPermissionOfRoleByRoleName = function (roleName) {
    switch (roleName) {
        case "ADMIN":
            return ADMIN;
        case "COLLABORATOR":
            return COLLABORATOR;
        case "USER":
            return USER;
        default:
            return;

    }
}

export const {
    Account,
    Document,
    Activity,
    Notification,
    Role,
    Category,
    Post,
    User,
    ContentManagement,
    Statistic
} = PermissionList;


export function isGranted(permissionName) { //for permission of view (show an element or not)
    return authServices.isGranted(permissionName);
}

export function isGrantedAny(permissionList) {
    if (!permissionList || permissionList.length <= 0) {
        return true;
    }

    for (var i = 0; i < permissionList.length; i++) {
        if (isGranted(permissionList[i])) {
            return true;
        }
    }
    return false;
};

export function isGrantedAll(permissionList) {
    if (!permissionList || permissionList.length <= 0) {
        return true;
    }

    for (var i = 0; i < permissionList.length; i++) {
        if (!isGranted(permissionList[i])) {
            return false;
        }
    }
    return true;
};

