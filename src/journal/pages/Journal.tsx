import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from "../layout/JournalLayout";
import { NothingSelected, Note } from "../views";
import { RootState, useAppDispatch } from "../../store/store";
import { startNewNote } from "../../store/journal/thunks";
import { useSelector } from 'react-redux';
export const Journal = () => {
  const dispatch = useAppDispatch()
  const onClickNewNote = () => {
    dispatch(startNewNote())
  }
  const { isSaving, active } = useSelector((state: RootState) => state.journal)
  return (
    <JournalLayout>
      {Object.keys(active).length > 0 && active?.id !== "" ? <Note /> : <NothingSelected />}
      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
        onClick={onClickNewNote}
        disabled={isSaving}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
