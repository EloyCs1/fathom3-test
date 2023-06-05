import React, { useState } from "react";

import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ShareIcon from "@mui/icons-material/Share";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

import { Car } from "types/types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function CardCar({
  make,
  favorite,
  model,
  drive,
  fueltype1,
  year,
  trany,
  vclass,
}: Car) {
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">J</Avatar>}
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  Editar
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  Eliminar
                </MenuItem>
              </Menu>
            </>
          }
          title={`${make} ${model}`}
          subheader={`(${year})`}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List>
              <ListItem disablePadding>
                <ListItemIcon>
                  <LocalGasStationIcon />
                </ListItemIcon>
                <ListItemText primary={fueltype1} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <TimeToLeaveIcon />
                </ListItemIcon>
                <ListItemText primary={drive} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <SettingsSuggestIcon />
                </ListItemIcon>
                <ListItemText primary={trany} />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <AirlineSeatReclineExtraIcon />
                </ListItemIcon>
                <ListItemText primary={vclass} />
              </ListItem>
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
