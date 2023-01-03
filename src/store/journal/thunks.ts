import { collection, doc, setDoc,deleteDoc } from "firebase/firestore/lite"
import { loadNotes } from "../../Apis/loadNotes"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload } from "../../helpers/fileUpload"
import { AppDispatch, store } from "../store"
import { addEmptyNote, setActiveNote, isSavingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice"

export const startNewNote = () => {
    return async (dispatch: AppDispatch, getState: typeof store.getState) => {
        dispatch(isSavingNewNote())
        const { uid } = getState().auth
        const newNote = {
            id: "",
            title: "",
            body: "",
            date: new Date().getTime(),
            imageUrl: []
        }
        /*  
            Define the path to create a new collection, 
            the collection is created by the uid of the user 
        */
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote)
        newNote.id = newDoc.id;
        dispatch(addEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = () => {
    return async (dispatch: AppDispatch, getState: typeof store.getState) => {
        const { uid } = getState().auth
        if (!uid) throw new Error("El UID del usuario no existe");
        const allNotes = await loadNotes(uid)
        dispatch(setNotes(allNotes))
    }
}

export const startSavingNote = () => {
    return async (dispatch: AppDispatch, getState: typeof store.getState) => {
        dispatch(setSaving())
        const { uid } = getState().auth
        const { active } = getState().journal
        if (!uid) throw new Error("El UID del usuario no existe");
        const noteToFirestore = { ...active }
        delete noteToFirestore.id
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`)
        /* The prop merge , helps to add the values that missing in the DB */
        await setDoc(docRef, noteToFirestore, { merge: true })
        dispatch(updateNote(active))
    }
}

export const startUploadingFiles = (files = <any>[]) => {
    return async (dispatch: AppDispatch) => {
        dispatch(setSaving())
        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        const photosUrl = await Promise.all(fileUploadPromises)
        dispatch(setPhotosToActiveNote(photosUrl))
    }
}

export const startDeletingNote = () => {
    return async (dispatch: AppDispatch, getState: typeof store.getState) => {
        const { uid } = getState().auth
        const { active: note } = getState().journal
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        dispatch(deleteNoteById(note))
    }
}