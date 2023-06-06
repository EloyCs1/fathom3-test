import React from "react";

import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Car } from "types/types";

const CardCollapse: React.FC<{ expanded: boolean; car: Car }> = ({
  expanded,
  car,
}) => {
  const { drive, fueltype, trany, vclass } = car;
  const primaryTypographyProps = { fontSize: 14, fontWeight: "medium" };
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              <LocalGasStationIcon />
            </ListItemIcon>
            <ListItemText
              primary={fueltype}
              primaryTypographyProps={primaryTypographyProps}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <TimeToLeaveIcon />
            </ListItemIcon>
            <ListItemText
              primary={drive}
              primaryTypographyProps={primaryTypographyProps}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <SettingsSuggestIcon />
            </ListItemIcon>
            <ListItemText
              primary={trany}
              primaryTypographyProps={primaryTypographyProps}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <AirlineSeatReclineExtraIcon />
            </ListItemIcon>
            <ListItemText
              primary={vclass}
              primaryTypographyProps={primaryTypographyProps}
            />
          </ListItem>
        </List>
      </CardContent>
    </Collapse>
  );
};

export default CardCollapse;
