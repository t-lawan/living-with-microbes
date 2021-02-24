export const EnvironmentFilter = {
    CONTEXT: 'CONTEXT',
    ANNOTATIONS: 'ANNOTATIONS',
    DATA: 'DATA'
}

export const PageURls = {
    RESEARCH: {
        id: 'RESEARCH',
        url: '/research',
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
    }
    return response;
}