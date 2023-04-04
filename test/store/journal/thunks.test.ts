import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addEmptyNote, isSavingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe("thunks of journal", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("should create a new register in firebase", async () => {
    (getState as jest.Mock).mockReturnValue({
        auth: {
            uid: "TEST-UID",
            name: "demo",
        }
    });
    const newNote = {
      id: expect.any(String),
      title: "",
      body: "",
      date: expect.any(Number),
      imageUrl: [],
    };
    await startNewNote()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(isSavingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addEmptyNote(newNote));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(newNote));

    /* Delete data in firebase */
    const collectionRef = collection(FirebaseDB, `${getState().auth.uid}/journal/notes`);
    const { docs } = await getDocs(collectionRef);
    await Promise.all(docs.map(({ref}) => deleteDoc(ref)));
  });
});
