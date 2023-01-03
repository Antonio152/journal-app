export interface NoteModel {
    id?: string;
    title: string;
    body: string;
    date: string | number;
    imageUrl?: string[];
}

export interface JournalNote {
    note: NoteModel;
}