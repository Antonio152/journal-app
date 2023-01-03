export interface interfaceSliceAuth {
    status?: string,
    uid: any | string,
    email: any | string,
    displayName: any | string,
    photoURL: any | string,
    errorMessage?: any | string,
    errorCode?: any | string,
    success?: boolean
}

export interface interfaceSliceAuthLogOut {
    errorMessage: any | string,
}