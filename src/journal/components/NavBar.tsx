import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { drawerWProps } from '../types/navBarProps';
import { startLogout } from '../../store/auth/thunks';
import { useAppDispatch } from '../../store/store';
import { setDrawer } from '../../store/journal/journalSlice';

export const NavBar = ({ drawerWidth = 230 }: drawerWProps) => {
    const dispatch = useAppDispatch()
    const onLogout = ():void => {
        dispatch(startLogout())
    }
    const activeDrawer = ():void => {
        dispatch(setDrawer(true))
    }
    return (
        <AppBar
            position='fixed'
            sx={{
                width: { xs: '100%', sm: '100%', md: `calc(100% - ${drawerWidth}px)` },
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { xs: 'block', sm: 'block', md: 'none' } }}
                    onClick={activeDrawer}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                    <IconButton color='error' onClick={onLogout}>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>

            </Toolbar>
        </AppBar>
    )
}