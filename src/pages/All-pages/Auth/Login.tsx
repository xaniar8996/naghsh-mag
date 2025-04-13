import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// icons
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [loginForm, setLoginForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [textMessgae, setTextMessgae] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error" | undefined
  >("info");

  // router
  const router = useRouter();

  const ShowLogin = () => {
    setLoginForm((prev) => !prev);
  };

  // form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // baseURL
  const RegisterURL = "http://localhost:3001/Register";
  const LoginURL = "http://localhost:3001/Login";

  const Submit = async (data: any) => {
    const url = loginForm ? LoginURL : RegisterURL;

    // اگر فرم لاگین است، ایمیل را از داده‌ها حذف کن
    if (loginForm) {
      delete data.email;
    }

    const FetchUsers = axios.get(LoginURL);
    const Users = (await FetchUsers).data;

    const isUserExist = Users.find((check: any) => {
      return (
        check.username === data.username && check.password === data.password
      );
    });

    if (loginForm) {
      if (!isUserExist) {
        setOpen(true);
        setTextMessgae("کاربری با این مشخصات وجود ندارد !");
        setSeverity("error");
        return;
      }
    }

    try {
      const res = await axios.post(url, data);

      if (loginForm) {
        Cookies.set("User-Data", uuid(), { expires: 7 });
      } else {
        Cookies.set("New-User", uuid(), { expires: 7 });

        // **بعد از ثبت‌نام، درخواست لاگین بفرست**
        await axios.post(LoginURL, {
          username: data.username,
          password: data.password,
        });

        Cookies.set("User-Data", uuid(), { expires: 7 });
      }

      setOpen(true);
      setTextMessgae(
        loginForm
          ? "ورود با موفقیت انجام شد"
          : "ثبت نام و ورود با موفقیت انجام شد"
      );
      setSeverity("success");
      reset();

      setTimeout(() => {
        router.push("/All-pages/Home");
      }, 2000);
    } catch (error) {
      setOpen(true);
      setTextMessgae("خطا در ثبت نام , لطفا دوباره تلاش کنید");
      setSeverity("error");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="xl"
      className="Login-container h-100 flex column justify-center align-center w-100"
    >
      <Box className="flex column justify-center align-center gap-7">
        <Box
          className="flex column justify-center align-center g-5"
          sx={{
            boxShadow: "0px 8px 20px rgb(0,0,0,0.2)",
            width: "400px",
            height: "430px",
            borderRadius: "24px",
            mt: -7,
          }}
        >
          <Image
            src="/Login/logo (2).png"
            alt="Logo"
            width={900}
            height={900}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "12px",
              boxShadow: "0px 8px 20px rgb(0,0,0,0.2)",
            }}
          />
          <form
            onSubmit={handleSubmit(Submit)}
            className="flex column justify-center align-center gap-7"
            style={{ width: "70%", height: "270px" }}
          >
            {loginForm ? (
              <Box className="flex column justify-center align-center gap-10 w-100">
                <TextField
                  variant="standard"
                  label="نام کاربری"
                  fullWidth
                  type="text"
                  {...register("username", { required: true })}
                />
                <TextField
                  variant="standard"
                  label="پسوورد"
                  {...register("password", { required: true })}
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    p: 1.5,
                    backgroundColor: "black",
                    borderRadius: "10px",
                    ":hover": {
                      backgroundColor: "#d1c000",
                      transition: "0.2s ease",
                    },
                  }}
                >
                  ورود
                </Button>
              </Box>
            ) : (
              <>
                <TextField
                  variant="standard"
                  label="نام کاربری"
                  fullWidth
                  type="text"
                  {...register("username", { required: true })}
                />
                <TextField
                  variant="standard"
                  label="ایمیل"
                  fullWidth
                  type="email"
                  {...register("email", { required: true })}
                />
                <TextField
                  variant="standard"
                  label="پسوورد"
                  fullWidth
                  type="password"
                  {...register("password", { required: true })}
                />
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    p: 1.5,
                    backgroundColor: "black",
                    borderRadius: "10px",
                    ":hover": {
                      backgroundColor: "#d1c000",
                      transition: "0.2s ease",
                    },
                  }}
                >
                  ثبت نام
                </Button>
              </>
            )}
          </form>
        </Box>
        <Box className="flex row justify-center align-center gap-3">
          <Typography variant="body1" sx={{ color: "gray" }}>
            {loginForm ? "اکانت ندارید ؟ " : "از قبل اکانت دارید ؟"}
          </Typography>
          <Typography
            variant="body1"
            onClick={() => ShowLogin()}
            sx={{
              cursor: "pointer",
              ":hover": { color: "blue", transition: "0.2s ease" },
            }}
          >
            {loginForm ? "ثبت نام کن " : "وارد شوید"}
          </Typography>
        </Box>
      </Box>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
      >
        <Alert severity={severity} variant="filled">
          {textMessgae}
        </Alert>
      </Snackbar>
    </Container>
  );
}
