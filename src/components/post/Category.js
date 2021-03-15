// import React, { Component } from 'react';
// import 'components/styles/Category.scss';
// import { Link } from 'react-router-dom'
// import { setQueryParam } from 'utils/urlUtils';
// import { getPostSearch } from 'redux/services/postServices';
// import store from 'redux/store/index'

// //Set text props for this component
// export default class Category extends Component {

//     onClick = () => {

//         //if the location is search/posts/... => recall API 

//         if (window.location.pathname.substring(0, 5) === "/tags") {
//             let queryParamObject = {
//                 "page": 1,
//                 category: this.props.id,
//             }
//             let searchParamObject = {
//                 "page": 1,
//                 category: this.props.id,
//                 searchTerm: ''
//             }

//             setQueryParam(queryParamObject);
//             store.dispatch(getPostSearch(searchParamObject));
//         }

//         if (this.props.onCategoryClick)
//             this.props.onCategoryClick(this.props.tag.id);

//     }
//     render() {
//         return (
//             <Link to={`/search/posts?page=1&category=${this.props.id}`}
//                 className="simple-tag" onClick={this.onCategoryClick} >
//                 <div className="d-flex">
//                     {!this.props.isReadOnly && <div onClick={e => this.onDelete(e)} className="tag-delete-btn"><div className="close_8x8" /> </div>}
//                     <div className="mg-left-5px"> {this.props.tag.content} </div>
//                 </div>
//             </Link >
//         )
//     }
// }

