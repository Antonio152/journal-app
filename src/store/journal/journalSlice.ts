import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteModel } from './types/journalSliceTypes';

export const journalSlice = createSlice({
    name: 'name',
    initialState: {
        isSaving: false,
        messageSaved: "",
        notes: <NoteModel[]>[],
        active: <NoteModel>{}
    },
    reducers: {
        /* Helps to know if a new Note is saving */
        isSavingNewNote: (state) => {
            state.isSaving = true;
        },
        /* add the data of new note to Store */
        addEmptyNote: (state, action: PayloadAction<NoteModel>) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        /* Set the note that is selected or is active/saved */
        setActiveNote: (state, action: PayloadAction<NoteModel>) => {
            state.active = action.payload;
            state.messageSaved = "";
        },
        /* Set notes in store */
        setNotes: (state, action: PayloadAction<NoteModel[]>) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = "";
        },
        updateNote: (state, action: PayloadAction<NoteModel>) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note);
            state.messageSaved = `Nota: ${action.payload.title}, se guardaron los cambios correctamente`;
        },
        setPhotosToActiveNote: (state, action: PayloadAction<string[]>) => {
            state.active.imageUrl = [...state.active.imageUrl!, ...action.payload];
            state.isSaving = false;
        },
        clearNoteOnLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = "";
            state.notes = [];
            state.active = {
                id: "",
                title: "",
                body: "",
                date: "",
                imageUrl: []
            };
        },
        deleteNoteById: (state, action: PayloadAction<NoteModel>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload.id);
            state.active = {
                id: "",
                title: "",
                body: "",
                date: "",
                imageUrl: []
            };;
        }
    }
});


// Action creators are generated for each case reducer function
export const { clearNoteOnLogout, setPhotosToActiveNote, isSavingNewNote, addEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions;