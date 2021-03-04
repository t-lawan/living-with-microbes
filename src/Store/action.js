export const LOADING = 'LOADING';
export const HAS_LOADED = 'HAS_LOADED';
export const IS_LOADING = 'IS_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const TOGGLE_ANNOTATIONS = "TOGGLE_ANNOTATIONS"
export const TOGGLE_CONTEXT = "TOGGLE_CONTEXT"
export const TOGGLE_DATA = "TOGGLE_DATA"
export const TOGGLE_FUTURE_STORIES = "TOGGLE_FUTURE_STORIES"
export const TOGGLE_NOW_STORIES = "TOGGLE_NOW_STORIES"

export const toggleAnnotations = () => {
    return {
        type: TOGGLE_ANNOTATIONS
    }
}

export const toggleContext = () => {
    return {
        type: TOGGLE_CONTEXT
    }
}

export const toggleFutureStories = () => {
    return {
        type: TOGGLE_FUTURE_STORIES
    }
}

export const toggleNowStories = () => {
    return {
        type: TOGGLE_NOW_STORIES
    }
}

export const toggleData = () => {
    return {
        type: TOGGLE_DATA
    }
}

export const loading = (loaded, total) => {
    return  {
        type: LOADING,
        loaded: loaded,
        total: total

    }
}

export const hasLoaded = () => {
    return {
        type: HAS_LOADED
    }
}

export const isLoading = () => {
    return {
        type: IS_LOADING
    }
}

export const stopLoading = () => {
    return {
        type: STOP_LOADING
    }
}