import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { galleryProps } from './types/imageGalleryInterface';

export const ImageGallery = ({imageUrl}:galleryProps) => {
  if (imageUrl.length === 0) return <div>
    <h1>No hay imagenes para mostrar</h1>
  </div>;
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      {imageUrl.map((imagen) => (
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
  )
}
