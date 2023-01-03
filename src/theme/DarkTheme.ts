import { createTheme } from '@mui/material'
import { red } from "@mui/material/colors"

export const darkMode = createTheme({
    palette: {
        mode:'dark',
        error: {
            main:red.A400
        }
    }
})