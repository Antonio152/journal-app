import { FirebaseApp, FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { loginWithEmailPasswordI, registerWithEmailPasswordI } from "./types/providers";

const gooogleProvider = new GoogleAuthProvider()
export const singiInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, gooogleProvider)
        const { displayName, email, photoURL, uid } = result.user
        return { displayName, email, photoURL, uid, success: true }
        /* const credential = GoogleAuthProvider.credentialFromResult(result)
        console.log({credential})  */
    } catch (error) {
        if (error instanceof FirebaseError) {
            const errorMessage = error.message
            const errorCode = error.code
            return { displayName: "", email: "", photoURL: "", uid: "", errorCode, errorMessage, success: false }
        }

    }
}

export const registerWithEmailPassword = async ({ fullName, email, password }: registerWithEmailPasswordI) => {
    try {
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = res.user
        /* Obtenemos los datos del registro que se hizo e inmediatamente lo actualizamos */
        const user = FirebaseAuth.currentUser
        await updateProfile(user!, { displayName: fullName })
        return {
            success: true,
            uid,
            photoURL,
            email,
            errorMessage: ""
        }
    } catch (error) {
        if (error instanceof FirebaseError) {
            return {
                success: false,
                uid: "",
                photoURL: "",
                email: "",
                errorMessage: error.message
            }
        }
    }
}

export const loginWithEmailPassword = async ({ email, password }: loginWithEmailPasswordI) => {
    try {
        const res = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName } = res.user
        return {
            success: true,
            uid,
            displayName,
            photoURL,
            email,
            errorMessage: ""
        }
    } catch (error) {
        if (error instanceof FirebaseError) {
            return {
                success: false,
                uid: "",
                displayName: "",
                photoURL: "",
                email: "",
                errorMessage: error.message
            }
        }
    }
}

export const logoutFirebase = async () => {
   return await FirebaseAuth.signOut()
}