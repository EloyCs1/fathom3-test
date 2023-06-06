import React, { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import { Car } from "types/types";
import CardAction from "../cardAction/card-action";
import CardCollapse from "../cardCollapse/card-collapse";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const CardCar: React.FC<Car> = ({
  id,
  make,
  favorite,
  model,
  drive,
  fueltype,
  year,
  trany,
  vclass,
}) => {
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

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader
          avatar={<Avatar>J</Avatar>}
          action={<CardAction id={id} />}
          title={`${make} ${model}`}
          subheader={`(${year})`}
        />
        <CardActions disableSpacing>
          <IconButton>
            {favorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <ExpandMore expand={expanded} onClick={handleExpandClick}>
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <CardCollapse
          expanded={expanded}
          fueltype={fueltype}
          drive={drive}
          trany={trany}
          vclass={vclass}
        />
      </Card>
    </Grid>
  );
};

export default CardCar;
