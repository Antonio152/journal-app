import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { setActiveNote, updateNote } from '../../store/journal/journalSlice'
import { NoteModel } from '../../store/journal/types/journalSliceTypes'
import { useAppDispatch } from '../../store/store'

export const SidebarItem = ({ title, id, body, date, imageUrl = [] }: NoteModel) => {
    const dispatch = useAppDispatch()
    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title
    }, [title])

    const defineActiveNote = () => {
        dispatch(setActiveNote({ title, id, body, date, imageUrl }))
    }

    return (
        <ListItem key={id} disablePadding >
            <ListItemButton onClick={()=>defineActiveNote()}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
