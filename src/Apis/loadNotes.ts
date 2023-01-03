import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"
import { NoteModel } from "../store/journal/types/journalSliceTypes"
/* Function to get the notes by the  UID */
export const loadNotes = async (uid = "") => {
    const conllectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
    const docs = await getDocs(conllectionRef)
    const notes = <NoteModel[]>[]
    docs.forEach(doc => {
        notes.push({
            id: doc.id,
            body: doc.data().body,
            title: doc.data().title,
            date: doc.data().date,
            imageUrl: doc.data().imageUrl || []
        })
    });
    return notes
}