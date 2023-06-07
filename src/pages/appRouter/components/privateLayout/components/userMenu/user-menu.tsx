import React from "react";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

import FlagIcon from "@mui/icons-material/Flag";
import Logout from "@mui/icons-material/Logout";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { SIZE } from "constants/constants";
import { logout } from "features/user/userSlice";

export default function UserMenu() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const [openLang, setOpenLang] = React.useState(false);

  const openLangModal = () => {
    setOpenLang(true);
  };
  const closeLangModal = () => {
    setOpenLang(false);
  };

  const changeLanguage = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value as string);
    closeLangModal();
  };

  return (
    <>
      <IconButton onClick={handleMenu}>
        <Avatar sx={{ width: 32, height: 32 }}>{user.name.charAt(0)}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> {`${user.name} ${user.lastname}`}
        </MenuItem>
        <MenuItem>{user.email}</MenuItem>
        <Divider />
        <MenuItem onClick={openLangModal}>
          <ListItemIcon>
            <FlagIcon fontSize={SIZE} />
          </ListItemIcon>
          {t("usermenu.language")}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize={SIZE} />
          </ListItemIcon>
          {t("usermenu.logout")}
        </MenuItem>
      </Menu>
      <Dialog disableEscapeKeyDown open={openLang} onClose={closeLangModal}>
        <DialogTitle>{t("usermenu.language")}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap" }}
            marginTop={1}
          >
            <FormControl fullWidth>
              <InputLabel id="language">{t("usermenu.language")}</InputLabel>
              <Select
                labelId="language"
                value={i18n.language}
                label={t("usermenu.language")}
                onChange={changeLanguage}
              >
                <MenuItem value={"es"}>{t("usermenu.es")}</MenuItem>
                <MenuItem value={"en"}>{t("usermenu.en")}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
