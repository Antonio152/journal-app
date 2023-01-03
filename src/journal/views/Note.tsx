import { ChangeEvent, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useForm } from "../../auth/hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startLoadingNotes, startSavingNote, startUploadingFiles } from "../../store/journal/thunks";
import { RootState, useAppDispatch } from "../../store/store";
import { ImageGallery } from '../components'

export const Note = () => {
  const dispatch = useAppDispatch()
  const { active: noteActive, messageSaved, isSaving } = useSelector((state: RootState) => state.journal)
  const { body, title, date, onChangeEvent, formState } = useForm(noteActive)


  const dateString = useMemo(() => {
    return new Date(date).toUTCString()
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  const onSaveNote = () => {
    dispatch(startSavingNote())
  }

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success')
    }
  }, [messageSaved])

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files === null) return null;
    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
    dispatch(startLoadingNotes())
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>

        <IconButton
          color="primary"
          disabled={isSaving}
          component="label">
          <input
            type="file"
            multiple
            hidden
            onChange={onFileInputChange} />
          <UploadOutlined />
        </IconButton>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onChangeEvent}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onChangeEvent}
        />
      </Grid>



      <Grid container justifyContent={"end"}>
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color="error">
          <DeleteOutline />
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery imageUrl={noteActive.imageUrl!} />
    </Grid>
  );
};
