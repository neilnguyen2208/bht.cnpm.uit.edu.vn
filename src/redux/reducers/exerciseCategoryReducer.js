import {
    GET_EXERCISE_CATEGORIES_REQUEST,
    GET_EXERCISE_CATEGORIES_SUCCESS,
    GET_EXERCISE_CATEGORIES_HAVE_ALL_SUCCESS,
    GET_EXERCISE_CATEGORIES_FAILURE
} from '../constants.js'

const initialState = {
    categories: {
        isLoading: false,
        data: [],
        searchData: []
    },
}

function ExerciseCategoryReducer(state = initialState, action) {
    switch (action.type) {
        //get post category
        case GET_EXERCISE_CATEGORIES_REQUEST:
            return { ...state, categories: { ...state.categories, isLoading: true } }
        case GET_EXERCISE_CATEGORIES_HAVE_ALL_SUCCESS:
            //append category to this current array of data
            return { ...state, categories: { ...state.categories, searchData: [{ id: 0, name: "Tất cả", value: null }, ...action.payload], isLoading: false } }
        case GET_EXERCISE_CATEGORIES_SUCCESS:
            return { ...state, categories: { ...state.categories, data: action.payload, isLoading: false } }
        case GET_EXERCISE_CATEGORIES_FAILURE:
            return { ...state, categories: { ...state.categories, isLoading: false } }
        default:
            return state;
    }
}

export default ExerciseCategoryReducer;

