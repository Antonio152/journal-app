import React,{PropsWithChildren} from "react";
import { Toolbar } from '@mui/material';
import { Box } from "@mui/system";
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components";
export const JournalLayout = ({children}:PropsWithChildren) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn animate__faster">
      <NavBar drawerWidth={230}/>
      <SideBar drawerWidth={230}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
