import {

    //my courses
    get_MyCoursesRequest,

    //coursess list 
    get_CoursesListRequest,
    get_CoursesListSuccess,
    get_CoursesListFailure,

    get_DCCoursesListRequest,
    get_DCCoursesListSuccess,
    get_DCCoursesListFailure,

    get_CSNNCoursesListRequest,

    //courses search result 
    get_CourseSearchResultRequest,
    get_CSNNCoursesListSuccess,
    get_CSNNCoursesListFailure,
    get_CourseTopicsWithExercisesBySubjectIdRequest,
    get_CourseTopicsWithExercisesBySubjectIdSuccess,
    get_CourseTopicsWithExercisesBySubjectIdFailure,
    get_CourseDetailByIdRequest,
    get_CourseDetailByIdSuccess,
    get_CourseDetailByIdFailure,
    get_AnExerciseInfoByIdFailure,
    get_AnExerciseInfoByIdSuccess,
    get_AnExerciseInfoByIdRequest,
    get_CourseTopicsWithExercisesByExerciseIdRequest,
    get_CourseTopicsWithExercisesByExerciseIdSuccess,
    get_CourseTopicsWithExercisesByExerciseFailure,
    get_ExerciseQuestionsRequest,
    get_ExerciseQuestionsSuccess,
    get_ExerciseQuestionsFailure,
    get_RelativePostsByExerciseIdRequest,
    get_RelativeDocumentsByExerciseIdRequest,
    get_RelativePostsByExerciseIdSuccess,
    get_RelativePostsByExerciseIdFailure,
    get_RelativeDocumentsByExerciseIdSuccess,
    get_RelativeDocumentsByExerciseIdFailure,
    get_CurrentUserExerciseStatisticRequest,
    get_CurrentUserExerciseStatisticSuccess,
    check_ExerciseQuestionsRequest,
    check_ExerciseQuestionsFailure,
    check_ExerciseQuestionsSuccess,
    update_ExerciseNoteReset,
    update_ExerciseNoteFailure,
    get_ExerciseNoteRequest,
    get_ExerciseNoteSuccess,
    get_ExerciseNoteFailure,
    post_ResolveAnExerciseReset,
    post_ResolveAnExerciseSuccess,
    post_ResolveAnExerciseFailure,
    get_ReportedExercisesRequest,
    get_ReportedExercisesSuccess,
    get_ReportedExercisesFailure,
    set_TimeStart,
    set_TimeStop,
    post_CreateAnExerciseReset,
    post_CreateAnExerciseSuccess,
    post_CreateAnExerciseFailure,
    edit_ExerciseQuestionsWithAnswersReset,
    edit_ExerciseQuestionsWithAnswersSuccess,
    edit_ExerciseQuestionsWithAnswersFailure,
    get_AnExerciseQuestionsWithAnswersReset,
    get_AnExerciseQuestionsWithAnswersSuccess,
    get_AnExerciseQuestionsWithAnswersFailure,
    get_ExerciseQuestionDifficultyTypesRequest,
    get_ExerciseQuestionDifficultyTypesSuccess,
    get_ExerciseQuestionDifficultyTypesFailure,
    get_ExerciseSearchRequest,
    get_ExerciseSearchSuccess,
    get_ExerciseSearchFailure,
    put_EditAnExerciseInfoReset,
    put_EditAnExerciseInfoSuccess,
    put_EditAnExerciseInfoFailure,
    get_AnExerciseInfoForEditByIdRequest,
    get_AnExerciseInfoForEditByIdSuccess,
    get_AnExerciseInfoForEditByIdFailure,
} from "redux/actions/courseAction.js";
import { post_ReportAnExerciseFailure, post_ReportAnExerciseReset, post_ReportAnExerciseSuccess } from "redux/actions/courseAction";
import { authRequest } from "utils/requestUtils";
import { generateSearchParam } from "utils/urlUtils";
import { closeModal, openBLModal, openModal } from "./modalServices";

// my courses
export function getMyCourses() { //this API to get all approved document of a specific user.
    return dispatch => {
        dispatch(get_MyCoursesRequest());
    }
}

//courses list
export function getCoursesList(searchParamObject) {
    return dispatch => {
        dispatch(get_CoursesListRequest());
        authRequest.get(`/subjects?${generateSearchParam(searchParamObject)}`).then(response => {
            dispatch(get_CoursesListSuccess(response.data))
        }).catch(error => dispatch(get_CoursesListFailure(error)))
    }
}

export function getDCCoursesList() {
    return dispatch => {
        dispatch(get_DCCoursesListRequest());
        authRequest.get(`/subjects?subjectGroup=1`).then(response => {
            dispatch(get_DCCoursesListSuccess(response.data))
        }).catch(error => dispatch(get_DCCoursesListFailure(error)))
    }
}

export function getCSNNCoursesList() {
    return dispatch => {
        dispatch(get_CSNNCoursesListRequest());
        authRequest.get(`/subjects?subjectGroup=2`).then(response => {
            dispatch(get_CSNNCoursesListSuccess(response.data))
        }).catch(error => dispatch(get_CSNNCoursesListFailure(error)))
    }
}

export function getCourseTopicsWithExercisesBySubjectId(subjectId) {
    return dispatch => {
        dispatch(get_CourseTopicsWithExercisesBySubjectIdRequest());
        authRequest.get(`/exercises/topicsWithExercises?subjectID=${subjectId}`).then(response => {
            dispatch(get_CourseTopicsWithExercisesBySubjectIdSuccess(response.data))
        }).catch(error => dispatch(get_CourseTopicsWithExercisesBySubjectIdFailure(error)))
    }
}

export function getCourseTopicsWithExercisesByExerciseId(exerciseId) {
    return dispatch => {
        dispatch(get_CourseTopicsWithExercisesByExerciseIdRequest());
        authRequest.get(`/subjects/withExerciseTopicAndExerciseList/fromExercise/${exerciseId}`).then(response => {
            dispatch(get_CourseTopicsWithExercisesByExerciseIdSuccess(response.data))
        }).catch(error => dispatch(get_CourseTopicsWithExercisesByExerciseFailure(error)));
    }
}

export function getCourseDetailById(subjectId) {
    return dispatch => {
        dispatch(get_CourseDetailByIdRequest());
        authRequest.get(`/subjects?id=${subjectId}`).then(response_1 => {
            let result_1 = response_1.data;
            dispatch(get_CourseDetailByIdSuccess(result_1))
        }).catch(error => dispatch(get_CourseDetailByIdFailure(error)))
    }
}

export function getAnExerciseInfoById(exerciseId) {
    return dispatch => {
        dispatch(get_AnExerciseInfoByIdRequest());
        dispatch(getRelativePostsByExerciseId(exerciseId));
        dispatch(getRelativeDocumentsByExerciseId(exerciseId));
        authRequest.get(`/exercises/${exerciseId}`).then(response => {
            authRequest.get(`/exercises/statistics?exerciseIDs=${exerciseId}`).then(response_2 => {
                authRequest.get(`/exercises/actionAvailable?exerciseIDs=${exerciseId}`).then(response_3 => {
                    console.log({ ...response.data, ...response_2.data[0], ...response_3.data[0] })
                    dispatch(get_AnExerciseInfoByIdSuccess({ ...response.data, ...response_2.data[0], availableActions: response_3.data[0].availableActions }));
                }).catch(error => dispatch(get_AnExerciseInfoByIdFailure(error)))
            })
        }).catch(error => dispatch(get_AnExerciseInfoByIdFailure(error)))
    }
}

export function getAnExerciseInfoByIdForEdit(exerciseId) {
    return dispatch => {
        dispatch(get_AnExerciseInfoForEditByIdRequest());
        authRequest.get(`/exercises/${exerciseId}`).then(response => {
            authRequest.get(`/exercises/statistics?exerciseIDs=${exerciseId}`).then(response_2 => {
                dispatch(get_AnExerciseInfoForEditByIdSuccess({ ...response.data, ...response_2.data[0] }))
            }).catch(error => dispatch(get_AnExerciseInfoForEditByIdFailure(error)))
        })
    }
}

export function getCurrentUserExerciseStatistic(exerciseId) {
    return dispatch => {
        dispatch(get_CurrentUserExerciseStatisticRequest());
        authRequest.get(`/exercises/statistics/user?exerciseIDs=${exerciseId}`).then(response => {
            dispatch(get_CurrentUserExerciseStatisticSuccess(...response.data))
        }).catch(error => dispatch(get_AnExerciseInfoByIdFailure(error)))
    }
}

export function getExerciseQuestions(exerciseId) {
    return dispatch => {
        dispatch(get_ExerciseQuestionsRequest());
        authRequest.get(`/exercises/${exerciseId}/questionsAndAnswers`).then(response => {
            dispatch(get_ExerciseQuestionsSuccess(response.data))
        }).catch(error => dispatch(get_ExerciseQuestionsFailure(error)))
    }
}

export function checkExerciseAnswers(exerciseId, answersDTO) {
    return dispatch => {
        dispatch(check_ExerciseQuestionsRequest());
        authRequest.post(`/exercises/${exerciseId}/attempt`, JSON.stringify(answersDTO)).then(
            response => {
                dispatch(check_ExerciseQuestionsSuccess(response.data))
            }).catch(error => dispatch(check_ExerciseQuestionsFailure(error)))
    }
}

export function getRelativePostsByExerciseId(exerciseId) {
    return dispatch => {
        dispatch(get_RelativePostsByExerciseIdRequest());
        authRequest.get(`/posts/related?exerciseID=${exerciseId}`).then(response => {
            dispatch(get_RelativePostsByExerciseIdSuccess(response.data))
        }).catch(error => dispatch(get_RelativePostsByExerciseIdFailure(error)))
    }
}

export function getRelativeDocumentsByExerciseId(exerciseId) {
    return dispatch => {
        dispatch(get_RelativeDocumentsByExerciseIdRequest());
        authRequest.get(`/documents/related?exerciseID=${exerciseId}`).then(response => {
            dispatch(get_RelativeDocumentsByExerciseIdSuccess(response.data))
        }).catch(error => dispatch(get_RelativeDocumentsByExerciseIdFailure(error)))
    }
}

export function updateExerciseNote(exerciseId, noteContent) {
    return dispatch => {
        dispatch(update_ExerciseNoteReset());
        authRequest.put(`/exercises/${exerciseId}/notes`, JSON.stringify(noteContent)).then(response => {
            dispatch(update_ExerciseNoteFailure(response.data))
        }).catch(error => dispatch(update_ExerciseNoteFailure(error)))
    }
}

export function getExerciseNote(exerciseId) {
    return dispatch => {
        dispatch(get_ExerciseNoteRequest());
        authRequest.get(`/exercises/${exerciseId}/notes`).then(response => {
            dispatch(get_ExerciseNoteSuccess(response.data))
        }).catch(error => dispatch(get_ExerciseNoteFailure(error)))
    }
}

//coursess search result
export function getCourseSearchResult(searchParamObject) {
    return dispatch => {
        dispatch(get_CourseSearchResultRequest());
    }
}

//temp report services
export function getReportedExercises(searchParamObject) {
    return dispatch => {
        dispatch(get_ReportedExercisesRequest());
        authRequest.get(`/exercises/report?${generateSearchParam(searchParamObject)}`)
            .then(response => {
                let result_1 = response.data;
                let IDarr = '';
                response.data.exerciseReportDTOs.map(item => IDarr += item.id + ",") //tao ra mang id moi

                dispatch(get_ReportedExercisesSuccess({
                    exerciseReportDTOs: result_1.exerciseReportDTOs,
                    totalPages: result_1.totalPages,
                    totalElements: result_1.totalElements
                }))
            }).catch(error => { get_ReportedExercisesFailure(error) })
    }
}

export function reportAnExercise(id, reason) { //
    return dispatch => {
        dispatch(post_ReportAnExerciseReset())
        authRequest.post(`/exercises/${id}/report`, JSON.stringify(reason))
            .then(response => {
                dispatch(post_ReportAnExerciseSuccess());
            }).catch(() => dispatch(post_ReportAnExerciseFailure()))
    }
}

export function resolveAnExercise(id, resolveDTO) {
    return dispatch => {
        dispatch(post_ResolveAnExerciseReset());
        authRequest.post(`/exercises/resolveReport/${id}`, JSON.stringify(resolveDTO))
            .then(result => {
                dispatch(post_ResolveAnExerciseSuccess());
            })
            .catch(error => post_ResolveAnExerciseFailure())
    }
}

export function createAnExercise(exerciseDTO) {
    return dispatch => {
        dispatch(post_CreateAnExerciseReset());
        authRequest.post(`/exercises`, JSON.stringify(exerciseDTO))
            .then(result => {
                dispatch(post_CreateAnExerciseSuccess(result.data));
            })
            .catch(error => post_CreateAnExerciseFailure())
    }
}

export function editAnExerciseQuestionWithAnswers(exerciseID, questionDTO) {
    return dispatch => {
        dispatch(edit_ExerciseQuestionsWithAnswersReset());
        authRequest.put(`/exercises/${exerciseID}/questionsWithAnswers`, JSON.stringify(questionDTO))
            .then(result => {
                dispatch(edit_ExerciseQuestionsWithAnswersSuccess(result.data));
            })
            .catch(error => edit_ExerciseQuestionsWithAnswersFailure())
    }
}

export function getAnExerciseQuestionsWithAnswers(exerciseID) {
    return dispatch => {
        dispatch(get_AnExerciseQuestionsWithAnswersReset());
        authRequest.get(`/exercises/${exerciseID}/questionsWithAnswers`)
            .then(response => {
                dispatch(get_AnExerciseQuestionsWithAnswersSuccess(response.data));
            })
            .catch(error => get_AnExerciseQuestionsWithAnswersFailure())
    }
}

export function getExerciseQuestionDifficultyTypes(exerciseID) {
    return dispatch => {
        dispatch(get_ExerciseQuestionDifficultyTypesRequest());
        authRequest.get(`/exercises/questions/difficulties`)
            .then(response => {
                dispatch(get_ExerciseQuestionDifficultyTypesSuccess(response.data));
            })
            .catch(error => get_ExerciseQuestionDifficultyTypesFailure())
    }
}

export function getExerciseSearch(searchParamObject) {
    return dispatch => {
        dispatch(get_ExerciseSearchRequest());
        authRequest.get(`/exercises/searchFilter?${generateSearchParam(searchParamObject)}`)
            .then(response => {
                //statistic
                let result_1 = response.data;
                dispatch(get_ExerciseSearchSuccess({
                    exerciseSearchResultDTOs: result_1.exerciseSearchResultDTOs,
                    totalPages: result_1.totalPages,
                    totalElements: result_1.totalElements
                }))
            })
            .catch(error => {
                dispatch(get_ExerciseSearchFailure(error))
            })
    }
}

export function editAnExerciseInfo(id, newExerciseInfo) { //
    return dispatch => {
        dispatch(put_EditAnExerciseInfoReset())
        openModal("loader", { text: "Đang xử lý" });
        authRequest.put(`/exercises/${id}`, JSON.stringify(newExerciseInfo))
            .then(response => {
                dispatch(closeModal());
                openBLModal({ text: "Chỉnh sửa tài liệu thành công!", type: "success" });
                dispatch(put_EditAnExerciseInfoSuccess(id, newExerciseInfo));
            }
            ).catch(() => dispatch(put_EditAnExerciseInfoFailure()))
    }
}

export function setTimeStart() {
    return dispatch => { dispatch(set_TimeStart()) }
}

export function setTimeStop() {
    return dispatch => { dispatch(set_TimeStop()) }
}