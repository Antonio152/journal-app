export const checkingState = {
    status: "checking",// not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: "authenticated",// not-authenticated, authenticated
    uid: "12321",
    email: "demo@mail.com",
    displayName: "Prueba Antonio",
    photoURL: "https://demo.jpg",
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: "not-authenticated",// not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: "Error de prueba",
}


export const demoUser = {
    uid: "12321",
    email: "demo@mail.com",
    displayName: "Prueba Antonio",
    photoURL: "https://demo.jpg",
    errorMessage: null,
}