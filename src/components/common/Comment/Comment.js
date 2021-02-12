// import React, { Component } from 'react';
// import 'components/common/Button/Button.scss'

// import { bindActionCreators } from 'redux';
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import './Comment.scss'
// import propsType from 'prop-types'
// //Set text props for this component

// const data = {
//     post: {
//         id: 1,
//         content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
//         user: "Richard McClintock",
//         userPic: "https://телеграм.мессенджеры.рус/wp-content/uploads/2016/04/garfild-dlya-telegram-online-16.png",
//         publishDate: "2 Weeks ago",
//         likes: 18,
//         commentsNumber: 3,
//     },
//     comments: [
//         {
//             id: 0,
//             user: "Bonorum Malorum",
//             content: "Many desktop publishing packages and web page editors now use",
//             userPic: "https://upload.wikimedia.org/wikipedia/ru/thumb/b/bc/Garfield_the_Cat.svg/1200px-Garfield_the_Cat.svg.png",
//             publishDate: "2 days ago"
//         },
//         {
//             id: 1,
//             user: "Cicero Areals",
//             content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
//             userPic: "https://static.tgstat.ru/public/images/channels/_0/f0/f0f7f79a275a83bfe8769dfd81d40bb2.jpg",
//             publishDate: "4 days ago"
//         },
//         {
//             id: 2,
//             user: "Hanna Pages",
//             content: "Lorem Ipsum comes from sectionsof de Finibus Bonorum et Malorum (The Extremes of Good and Evil)",
//             userPic: "https://vignette.wikia.nocookie.net/versus-compendium/images/0/09/Garfield.png/revision/latest?cb=20181122134939",
//             publishDate: "1 Week ago"
//         },
//     ]
// };

// class Post extends React.Component {
//     state = {
//         like: false,
//     };

//     addLike = () => {
//         let changeLike = this.state.like;
//         let add;
//         changeLike ? (changeLike = false, add = -1)
//             : (changeLike = true, add = 1)

//         this.setState({
//             like: changeLike,
//         })

//         this.props.onAddLike({
//             likes: this.props.likes + add,
//         });

//     }
//     render() {
//         return (
//             <div className="post">
//                 <div className="postBody">
//                     <img src={this.props.userPic} className="postPic" alt="user Pic" />
//                     <div className="postContent">
//                         <div className="postHeader">
//                             <h2 className="postAuthor" id={this.props.id}>{this.props.user}</h2>
//                             <span className="publishDate">{this.props.publishDate}</span>
//                         </div>
//                         <span className="postText">{this.props.content}</span>
//                         <div className="postDesc">
//                             <span className="desc">
//                                 {this.state.like
//                                     ? <i onClick={this.addLike} className="fas fa-heart"></i>
//                                     : <i onClick={this.addLike} className="far fa-heart"></i>}
//                                 <span>{this.props.likes} </span>
//                             Likes
//                           </span>
//                             <span className="desc"><i class="far fa-comment"></i><span>{this.props.commentsNumber}</span> Comments</span>
//                         </div>
//                     </div>
//                 </div>
//                 {this.props.children}
//             </div>
//         );
//     }
// }

// Post.propsTypes = {
//     userPic: PropTypes.string.isRequired,
//     publishDate: PropTypes.string.isRequired,
//     likes: PropTypes.number.isRequired,
//     commentsNumber: PropTypes.number.isRequired,
//     id: PropTypes.number.isRequired,
//     user: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     onAddLike: PropTypes.func.isRequired,
// }

// const Comment = props =>
//     <div className="comment">
//         <img src={props.userPic} className="commentPic" alt="user Pic" />
//         <div className="commentBody">
//             <div className="commentHeader">
//                 <h3 className="commentAuthor">{props.user}</h3>
//                 <span className="publishDate">{props.publishDate}</span>
//             </div>
//             <span className="commentContent">{props.content}</span>
//         </div>
//     </div>

// Comment.propTypes = {
//     id: PropTypes.number.isRequired,
//     user: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     userPic: PropTypes.string.isRequired,
// };

// class CreateComment extends React.Component {
//     state = {
//         content: "",
//     };

//     handleTextChange = e => {
//         const content = e.target.value;
//         this.setState({
//             content,
//         });
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         this.props.onCommentSubmit({
//             user: "Anonym",
//             content: this.state.content.trim(),
//             userPic: "https://github.com/OlgaKoplik/CodePen/blob/master/anonym.png?raw=true",
//             publishDate: "Right now"
//         });
//         this.setState({
//             content: "",
//         });
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit} className="createComment">
//                 <label htmlFor="comment">Your Comment</label>
//                 <textarea
//                     id="comment"
//                     type="text"
//                     placeholder="Comment"
//                     value={this.state.content}
//                     onChange={this.handleTextChange}
//                     required />
//                 <button type="submit">Post Comment</button>
//             </form>
//         );
//     }
// }
// CreateComment.propTypes = {
//     onCommentSubmit: PropTypes.func.isRequired,
//     content: PropTypes.string
// };

// class CommentBox extends React.Component {
//     state = {
//         comments: this.props.comments,
//         likes: this.props.post.likes,
//         commentsNumber: this.props.post.commentsNumber,
//     };

//     handleCommentSubmit = comment => {
//         const comments = this.state.comments;
//         comment.id = Date.now();
//         const newComments = [comment].concat(comments);
//         this.setState({
//             comments: newComments,
//             commentsNumber: this.state.commentsNumber + 1,
//         });
//     }
//     handleLike = changeLikesNum => {
//         const LikesNum = changeLikesNum.likes;
//         this.setState({
//             likes: LikesNum,
//         });
//     }
//     render() {
//         return (
//             <div className="commentBox">
//                 <Post
//                     publishDate={this.props.post.publishDate}
//                     userPic={this.props.post.userPic}
//                     likes={this.state.likes}
//                     commentsNumber={this.state.commentsNumber}
//                     id={this.props.post.id}
//                     content={this.props.post.content}
//                     user={this.props.post.user}
//                     onAddLike={this.handleLike}>
//                     <CreateComment
//                         onCommentSubmit={this.handleCommentSubmit}
//                     />
//                 </Post>
//                 {this.state.comments.map((comment) =>
//                     <Comment
//                         publishDate={comment.publishDate}
//                         key={comment.id}
//                         id={comment.id}
//                         content={comment.content}
//                         user={comment.user}
//                         userPic={comment.userPic} />
//                 )}
//             </div>
//         );
//     }
// }
// CommentBox.propTypes = {
//     post: PropTypes.object,
//     comments: PropTypes.arrayOf(PropTypes.object)
// };
// ReactDOM.render(<CommentBox
//     comments={data.comments}
//     post={data.post} />,
//     document.getElementById("root"));


// // const mapStateToProps = (state) => {
// //     console.log(state);
// //     return {

// //     };
// // }

// // const mapDispatchToProps = (dispatch) => bindActionCreators({

// // }, dispatch);

// // export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment));