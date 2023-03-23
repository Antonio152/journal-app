import { ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useForm } from "../../auth/hooks/useForm";
import {
  setActiveNote,
  setImagesUpload,
} from "../../store/journal/journalSlice";
import { startDeletingNoteAndImages , startSavingNote } from "../../store/journal/thunks";
import { RootState, useAppDispatch } from "../../store/store";
import { ImageGallery } from "../components";
import { dateString } from "../functions/NoteFunctions";

export const Note = () => {
  /* Redux logic */
  const dispatch = useAppDispatch();
  const {
    active: noteActive,
    messageSaved,
    isSaving,
    filesUploadImg,
  } = useSelector((state: RootState) => state.journal);
  const { body, title, date, onChangeEvent, formState } = useForm(noteActive);

  const handleStoreImages = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files === null) return null;
    const files = Array.from(target.files);

    /* Generate array of links */
    dispatch(setImagesUpload(files));
  };

  /* Logic to save notes */
  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  /* if the note is saved  */
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota", messageSaved, "success");
    }
  }, [messageSaved]);

  /* Logic to delete images and notes  */
  const onDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No se podrá revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingNoteAndImages());

        Swal.fire(
          "Eliminado",
          "La nota se ha sido eliminado correctamente",
          "success"
        );
      }
    });
  };

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
          {dateString(date)}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          color="primary"
          disabled={isSaving}
          component="label"
          onClick={(event) => {
            const element = event.target as HTMLInputElement;
            element.value = "";
          }}
        >
          <input
            type="file"
            multiple
            hidden
            onChange={handleStoreImages}
          />
          <UploadOutlined titleAccess="Subir imagenes" />
        </IconButton>
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined
            titleAccess="Guardar nota"
            sx={{ fontSize: 30, mr: 1 }}
          />
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
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
        </Button>
      </Grid>
      {/* Image gallery */}
      <ImageGallery
        imagesCloud={noteActive.imageUrl!}
        imagesToUpload={filesUploadImg}
      />
    </Grid>
  );
};

//indicador
