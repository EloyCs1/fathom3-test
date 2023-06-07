import { useTranslation } from "react-i18next";

import GarageIcon from "@mui/icons-material/Garage";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import UserMenu from "../userMenu/user-menu";

export default function AppHeader() {
  const { t } = useTranslation();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <GarageIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("toolbar.text")}
        </Typography>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
