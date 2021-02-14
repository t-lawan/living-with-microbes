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
    }
    return response;
}