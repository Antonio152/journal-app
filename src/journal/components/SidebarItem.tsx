import NoteIcon from '@mui/icons-material/Note';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { restartImagesUpload, setActiveNote, setDrawer } from '../../store/journal/journalSlice'
import { NoteModel } from '../../store/journal/types/journalSliceTypes'
import { RootState, useAppDispatch } from '../../store/store'

export const SidebarItem = ({ title, id, body, date, imageUrl = [] }: NoteModel) => {
    const dispatch = useAppDispatch()
    const { variantScreen } = useSelector((state: RootState) => state.journal);
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title
    }, [title])

    const defineActiveNote = () => {
        dispatch(setActiveNote({ title, id, body, date, imageUrl }))
        dispatch(restartImagesUpload())
        if(variantScreen === "temporary"){
            dispatch(setDrawer(false))
        }
    }

    return (
        <ListItem key={id} disablePadding >
            <ListItemButton onClick={()=>defineActiveNote()}>
                <ListItemIcon sx={{display:"flex",justifyContent:"center" }}>
                    <NoteIcon />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
