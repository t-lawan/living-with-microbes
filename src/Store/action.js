export const LOADING = 'LOADING';
export const HAS_LOADED = 'HAS_LOADED';
export const TOGGLE_ANNOTATIONS = "TOGGLE_ANNOTATIONS"
export const TOGGLE_CONTEXT = "TOGGLE_CONTEXT"
export const TOGGLE_DATA = "TOGGLE_DATA"

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