import React, { memo } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { galleryProps } from "./types/imageGalleryInterface";
import { Container, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch } from "../../store/store";
import { removeImageFromArray } from "../../store/journal/journalSlice";
import { imagesToBlobs } from "../functions/NoteFunctions";

export const ImageGallery = memo(
  ({ imagesCloud, imagesToUpload }: galleryProps) => {
    const dispatch = useAppDispatch();
    const handleRemoveImage = (index: number): void => {
      dispatch(removeImageFromArray(index));
    };
    const imagesUrl = imagesToBlobs(imagesToUpload);

    if (imagesCloud.length === 0 && imagesToUpload.length === 0) {
      return (
        <div>
          <h1>No hay imagenes para mostrar</h1>
        </div>
      );
    }

    return (
      <Container>
        {/* Imagenes to upload */}
        {imagesToUpload.length > 0 && (
          <>
            <h3>Imagenes para subir:</h3>
            <span>{imagesToUpload?.length} imágen(es)</span>
            <ImageList
              sx={{ width: "100%", height: 500, position: "relative" }}
              cols={4}
              rowHeight={200}
            >
              {imagesUrl.map((imagen, id) => (
                <ImageListItem key={imagen}>
                  <img
                    src={`${imagen}`}
                    alt={"Imagen de nota"}
                    loading="lazy"
                  />
                  <IconButton
                    aria-label="delete"
                    title="Eliminar imagen"
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      right: "auto",
                      left: "-10px",
                    }}
                    onClick={() => handleRemoveImage(id)}
                  >
                    <CancelIcon />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          </>
        )}

        {/* Images in cloud */}
        {imagesCloud.length > 0 && (
          <>
            <h3>Imagenes de nota:</h3>
            <ImageList
              sx={{ width: "100%", height: 500 }}
              cols={4}
              rowHeight={200}
            >
              {imagesCloud.map((imagen) => (
                <ImageListItem key={imagen}>
                  <img
                    src={`${imagen}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${imagen}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={"Imagen de nota"}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </>
        )}
      </Container>
    );
  }
);
