import {

    //my courses
    get_MyCoursesRequest,
    get_MyCoursesSuccess,
    get_MyCoursesFailure,

    //coursess list 
    get_CoursesListRequest,
    get_CoursesListSuccess,
    get_CoursesListFailure,

    //courses search result 
    get_CourseSearchResultRequest,
    get_CourseSearchResultSuccess,
    get_CourseSearchResultFailure,
} from "redux/actions/courseAction.js";


//#region Fake data region

//#endregion

export function uploadCourse(courses) {
    return dispatch => {

    }
}

export function getCourseByID(uid, pid) {
    return dispatch => {

    }
}

// my courses
export function getMyCourses() { //this API to get all approved document of a specific user.
    return dispatch => {

        dispatch(get_MyCoursesRequest());

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/courses`, requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    dispatch(get_MyCoursesSuccess(JSON.parse(result)));
                }
            )
            .catch(error => {
                 dispatch(get_MyCoursesFailure(error))
            })
    }
}

//courses list
export function getCoursesList(category = "") {
    return dispatch => {

        dispatch(get_CoursesListRequest(category));

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log("***");
        fetch(`https://5fe871c82e12ee0017ab46ef.mockapi.io/courses`, requestOptions)
            .then(response => response.text())
            .then(

                result => {
                    console.log(result)
                    dispatch(get_CoursesListSuccess(JSON.parse(result)));
                }
            )
            .catch(error => {
                 dispatch(get_CoursesListFailure(error))
            })
    }
}

//coursess search result
export function getCourseSearchResult(page = 1, category = "", searchTerm = "") {
    return dispatch => {
        dispatch(get_CourseSearchResultRequest());

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/courses`, requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    dispatch(get_CourseSearchResultSuccess(JSON.parse(result)));
                }
            )
            .catch(error => {
                 dispatch(get_CourseSearchResultFailure(error))
            })
    }
}

