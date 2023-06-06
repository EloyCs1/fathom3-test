import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { SIZE } from "constants/constants";
import { useTranslation } from "react-i18next";

export default function CardConfirm({
  onClose,
  onConfirm,
  open,
}: {
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>{t("card.confirm.message")}</DialogContent>
      <DialogActions>
        <Button size={SIZE} onClick={onClose}>
          {t("card.confirm.cancel")}
        </Button>
        <Button
          size={SIZE}
          onClick={onConfirm}
          autoFocus
          variant="contained"
          color="error"
        >
          {t("card.confirm.accept")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
