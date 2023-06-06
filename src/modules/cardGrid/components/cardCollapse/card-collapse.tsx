import React from "react";
import { useTranslation } from "react-i18next";

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
import { useGetTypesQuery } from "services/garageApi";
import { Car } from "types/types";

const CardCollapse: React.FC<{ expanded: boolean; car: Car }> = ({
  expanded,
  car,
}) => {
  const { t, i18n } = useTranslation();
  const { data } = useGetTypesQuery({
    language: i18n.language,
  });
  const getLabel = (value: string, key: string) => {
    if (data && data[key]) {
      return data[key].find((t) => t.value === value)?.label ?? value;
    }
    return value;
  };
  const { drive, fuel, trany, gears } = car;
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
              primary={getLabel(fuel, "fuel")}
              primaryTypographyProps={primaryTypographyProps}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <TimeToLeaveIcon />
            </ListItemIcon>
            <ListItemText
              primary={getLabel(drive, "drive")}
              primaryTypographyProps={primaryTypographyProps}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <SettingsSuggestIcon />
            </ListItemIcon>
            <ListItemText
              primary={getLabel(trany, "trany")}
              primaryTypographyProps={primaryTypographyProps}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <AirlineSeatReclineExtraIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${gears} ${t("add.gears")}`}
              primaryTypographyProps={primaryTypographyProps}
            />
          </ListItem>
        </List>
      </CardContent>
    </Collapse>
  );
};

export default CardCollapse;
