import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  forwardRef,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Snackbar,
  Alert,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

type DeleteDialogProps = {
  openDeleteBlog: boolean;
  setOpenDeleteBlog: Dispatch<SetStateAction<boolean>>;
  selectedBlog: any;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

export default function Delete_Blog(props: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [textMessgae, setTextMessgae] = useState("");
  const [loading, setLoading] = useState(false);
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error" | undefined
  >(undefined);

  const DeleteBLog = () => {
    setLoading(true);
    axios
      .delete(
        `https://67b08ce43fc4eef538e7b8cb.mockapi.io/Nagh_mag_Blog-post/${props.selectedBlog.id}`
      )
      .then((res) => {
        setOpen(true);
        setTextMessgae("بلاگ شما با موفقیت حذف شد");
        setSeverity("success");
        props.setRefresh(!props.refresh);
        props.setOpenDeleteBlog(false);
      })
      .catch((error) => {
        setOpen(true);
        setTextMessgae("خطا در حذف بلاگ , لطفا دوباره امتحان کنید !");
        setSeverity("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog
      open={props.openDeleteBlog}
      onClose={() => props.setOpenDeleteBlog(false)}
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "12px",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" color="error">
          حذف مقاله
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          آیا از حذف مقاله{" "}
          <b style={{ color: "red" }}>" {props.selectedBlog.Title} "</b> مطمئن
          هستید ؟
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => DeleteBLog()}
          color="error"
          sx={{ width: loading ? "15%" : "30%", borderRadius: "10px", p: 1.2 }}
        >
          {loading ? (
            <CircularProgress sx={{ color: "white"}} size={25} />
          ) : (
            "حذف"
          )}
        </Button>
        <Button
          variant="contained"
          onClick={() => props.setOpenDeleteBlog(false)}
          sx={{
            bgcolor: "#ccc",
            width: "30%",
            borderRadius: "10px",
            color: "black",
            p: 1.2,
            transition: "0.3s ease",
          }}
        >
          لغو
        </Button>
      </DialogActions>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        <Alert severity={severity} variant="filled">
          {textMessgae}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
