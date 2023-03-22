import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { drawerWProps } from '../types/navBarProps';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { SidebarItem } from './SidebarItem';

export const SideBar = ({ drawerWidth = 240 }: drawerWProps) => {
    const { displayName,photoURL } = useSelector((state: RootState) => state.auth)
    const { notes } = useSelector((state: RootState) => state.journal)
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='inherit' component='div' sx={{display:"flex"}}>
                        <img src={photoURL} alt={displayName} width={35} height={35} style={{borderRadius: "50%", margin:"auto", marginRight: 8}} />
                        {displayName}
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => (
                            <SidebarItem key={note.id} {...note}/>
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}