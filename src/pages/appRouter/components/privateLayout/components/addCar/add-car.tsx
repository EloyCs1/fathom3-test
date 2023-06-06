import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

import "./style.scss";

export default function AddCar() {
  return (
    <Fab className="fab" color="primary">
      <AddIcon />
    </Fab>
  );
}
