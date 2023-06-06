import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { SIZE } from "constants/constants";
import { useDeleteCarMutation } from "services/garageApi";
import CardConfirm from "../cardConfirm/card-confirm";

export default function CardAction({ id }: { id: number }) {
  const [deleteCar] = useDeleteCarMutation();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOnConfirm = async () => {
    await deleteCar(id);
    setOpenConfirm(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <EditIcon fontSize={SIZE} />
          </ListItemIcon>
          {t("card.edit")}
        </MenuItem>
        <MenuItem onClick={handleOpenConfirm}>
          <ListItemIcon>
            <DeleteIcon color="error" fontSize={SIZE} />
          </ListItemIcon>
          {t("card.delete")}
        </MenuItem>
      </Menu>
      <CardConfirm
        open={openConfirm}
        onClose={handleCloseConfirm}
        onConfirm={handleOnConfirm}
      />
    </>
  );
}
