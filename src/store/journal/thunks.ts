import { collection, doc, setDoc,deleteDoc } from "firebase/firestore/lite"
import { loadNotes } from "../../Apis/loadNotes"
import { FirebaseDB } from "../../firebase/config"
import { deleteImage } from "../../helpers/fileDelete"
import { fileUpload } from "../../helpers/fileUpload"
import { AppDispatch, store } from "../store"
import { addEmptyNote, setActiveNote, isSavingNewNote, setNotes, setSaving, updateNote, deleteNoteById } from "./journalSlice"

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
        const { active, filesUploadImg } = getState().journal
        if (!uid) throw new Error("El UID del usuario no existe");
        const noteToFirestore = { ...active }
        delete noteToFirestore.id
        /* Store images in cloud */
        if (filesUploadImg.length > 0) {
            const fileUploadPromises = []
            for (const file of filesUploadImg) {
                fileUploadPromises.push(fileUpload(file))
            }
            const photosUrl = await Promise.all(fileUploadPromises)
            noteToFirestore.imageUrl = [...active.imageUrl!, ...photosUrl]
        }
        const updatedNote = {...active, imageUrl:noteToFirestore.imageUrl}
        /* Update conent in firebase */
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`)
        /* The prop merge , helps to add the values that missing in the DB */
        await setDoc(docRef, noteToFirestore, { merge: true })
        dispatch(updateNote(updatedNote))
    }
}

/* export const startUploadingFiles = () => {
    return async (dispatch: AppDispatch,getState: typeof store.getState) => {
        dispatch(setSaving())
        const { filesUploadImg } = getState().journal
        const fileUploadPromises = []
        for (const file of filesUploadImg) {
            fileUploadPromises.push(fileUpload(file))
        }
        const photosUrl = await Promise.all(fileUploadPromises)
        dispatch(setPhotosToActiveNote(photosUrl))
    }
} */
/* This function delete only the note in database but no the images */
/* export const startDeletingNote = () => {
    return async (dispatch: AppDispatch, getState: typeof store.getState) => {
        const { uid } = getState().auth
        const { active: note } = getState().journal
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        dispatch(deleteNoteById(note))
    }
}
 */
export const startDeletingNoteAndImages = () => {
    return async (dispatch: AppDispatch, getState: typeof store.getState) => {
        const { uid } = getState().auth
        const { active: note } = getState().journal
        /* Delete images in cloudinary */
        const fileDeletePromises = []
        for (const file of note.imageUrl!) {
            fileDeletePromises.push(deleteImage(file))
        }
        await Promise.all(fileDeletePromises)
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        dispatch(deleteNoteById(note))

    }
}
export const deleteImageInNote = (id_delete: string) => {
    return async (dispatch: AppDispatch, getState: typeof store.getState) => {
        dispatch(setSaving())
        const { uid } = getState().auth
        const { active } = getState().journal
        if (!uid) throw new Error("El UID del usuario no existe");
        /* Delete image in cloudinary */
        deleteImage(id_delete)
        /* Update register in firebase */
        const filteredImages = active.imageUrl!.filter((id) => id !== id_delete)
        const noteToFirestore = { ...active, imageUrl: filteredImages }
        delete noteToFirestore.id
        /* Note with ID */
        const updatedNote = {...active, imageUrl: filteredImages}
        /* Update imageUrl in firebase */
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`)
        /* The prop merge , helps to add the values that missing in the DB */
        await setDoc(docRef, noteToFirestore, { merge: true })
        dispatch(updateNote(updatedNote))
    }
}