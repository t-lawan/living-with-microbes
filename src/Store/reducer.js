import { LOADING, HAS_LOADED, TOGGLE_ANNOTATIONS, TOGGLE_CONTEXT, TOGGLE_DATA, IS_LOADING, STOP_LOADING, TOGGLE_FUTURE_STORIES, TOGGLE_NOW_STORIES } from "./action";

const initalState = {
  has_loaded: false,
  is_loading: false,
  loaded: 0.0,
  total: 1.0,
  show_loading_page: false,
  show_data: true,
  show_future_stories: true,
  show_now_stories: true,
};


export const reducer = (state = initalState, action) => {
    switch (action.type) {
      case HAS_LOADED:
        return {
          ...state,
          has_loaded: true,
          loaded: 0.0,
          total: 1.0,
          is_loading: false,
        };
      case STOP_LOADING:
        return {
          ...state,
          has_loaded: false,
          loaded: 0.0,
          total: 1.0,
          is_loading: false,
          show_loading_page: false
        };
      case IS_LOADING:
        return {
          ...state,
          is_loading: true,
          show_loading_page: true
        };
      case LOADING:
        return {
          ...state,
          loaded: action.loaded,
          total: action.total
        };
      case TOGGLE_DATA:
          return {
            ...state, 
            show_data: !state.show_data
          }
      case TOGGLE_FUTURE_STORIES:
          return {
            ...state, 
            show_future_stories: !state.show_future_stories
          }
      case TOGGLE_NOW_STORIES:
          return {
            ...state, 
            show_now_stories: !state.show_now_stories
          }
      default:
        return state;
    }
  };
  
