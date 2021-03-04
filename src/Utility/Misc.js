export const EnvironmentFilter = {
    CONTEXT: 'CONTEXT',
    ANNOTATIONS: 'ANNOTATIONS',
    DATA: 'DATA',
    FUTURE_STORIES: 'FUTURE_STORIES',
    NOW_STORIES: 'NOW_STORIES',
}

export const PageURls = {
    RESEARCH: {
        id: 'RESEARCH',
        url: '/research',
    },
    NOW: {
        id: 'NOW',
        url: '/now',
    },
    FUTURE: {
        id: 'FUTURE',
        url: '/future',
    },
    PROPOSAL: {
        id: 'PROPOSAL',
        url: '/proposal',
    },
    HOME: {
        id: 'HOME',
        url: '/',
    }
}


export const IsPage = (page_id, pathname) => {
    let response = false;
    switch(page_id) {
        case PageURls.RESEARCH.id:
            response = (pathname === PageURls.RESEARCH.url)
            break;
        case PageURls.PROPOSAL.id:
            response = (pathname === PageURls.PROPOSAL.url)
            break;     
        case PageURls.HOME.id:
            response = (pathname === PageURls.HOME.url)
            break;  
        case PageURls.NOW.id:
            response = (pathname === PageURls.NOW.url)
            break; 
        case PageURls.FUTURE.id:
            response = (pathname === PageURls.FUTURE.url)
            break; 
    }
    return response;
}