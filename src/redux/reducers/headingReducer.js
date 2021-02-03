import {

    GET_HEADINGS_LIST_REQUEST,
    GET_HEADINGS_LIST_SUCCESS,
    GET_HEADINGS_LIST_FAILURE

} from '../constants.js'

const initialState = {


    //search course: use for search course and course list
    headingList: {
        isLoading: false,
        data: [],
        error: ""
    },


};

function HeadingReducer(state = initialState, action) {
    switch (action.type) {

        //get my course
        case GET_HEADINGS_LIST_REQUEST:
            return {
                ...state, headingList: { isLoading: true }
            };
        case GET_HEADINGS_LIST_SUCCESS:
            {
                return { ...state, headingList: { isLoading: false, data: action.payload, error: '' } }
            }
        case GET_HEADINGS_LIST_FAILURE:
            {
                return { ...state, headingList: { isLoading: false, error: action.payload, data: [] } }
            }

        default:
            return state;
    }
}

export default HeadingReducer;
