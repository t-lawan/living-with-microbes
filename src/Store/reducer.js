import { LOADING, HAS_LOADED, TOGGLE_ANNOTATIONS, TOGGLE_CONTEXT, TOGGLE_DATA } from "./action";

const initalState = {
  has_loaded: false,
  loaded: 0.0,
  total: 1.0,
  show_annotations: true,
  show_data: true,
  show_context: true
};


export const reducer = (state = initalState, action) => {
    switch (action.type) {
      case HAS_LOADED:
        return {
          ...state,
          has_loaded: true
        };
      case LOADING:
        return {
          ...state,
          loaded: action.loaded,
          total: action.total
        };
      case TOGGLE_ANNOTATIONS:
        return {
          ...state, 
          show_annotations: !state.show_annotations
        }
      case TOGGLE_CONTEXT:
        return {
          ...state, 
          show_context: !state.show_context
        }
      case TOGGLE_DATA:
          return {
            ...state, 
            show_data: !state.show_data
          }
      default:
        return state;
    }
  };
  
