import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { drawerWProps } from "../types/navBarProps";
import { RootState, useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { SidebarItem } from "./SidebarItem";
import avatar from "/assets/user-avatar.png";
import { setDrawer, setVariantScreen } from "../../store/journal/journalSlice";
import { useEffect } from "react";

type variantV = "permanent" | "persistent" | "temporary" | undefined;

export const SideBar = ({ drawerWidth = 240 }: drawerWProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { displayName, photoURL } = useSelector(
    (state: RootState) => state.auth
  );
  const { notes, drawerState, variantScreen } = useSelector(
    (state: RootState) => state.journal
  );
  const validationI =
    photoURL !== undefined && photoURL !== null && photoURL.length > 0;

  const handleDrawerClose = () => {
    dispatch(setDrawer(false));
  };

  /* Detect the size of the screen */
  const variantContent = variantScreen as variantV;
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isMediumScreen) {
      dispatch(setVariantScreen("temporary"));
      dispatch(setDrawer(false));
    } else {
      dispatch(setVariantScreen("persistent"));
      dispatch(setDrawer(true));
    }
  }, [isMediumScreen]);

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        open={drawerState}
        onClose={handleDrawerClose}
        variant={variantContent!} // temporary || permanent
        sx={{
          display: { xs: "flex", sm: "flex", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography
            variant="inherit"
            component="div"
            sx={{ display: "flex" }}
          >
            <img
              src={validationI ? photoURL : avatar}
              alt={displayName}
              width={35}
              height={35}
              style={{ borderRadius: "50%", margin: "auto", marginRight: 8 }}
            />
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SidebarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
