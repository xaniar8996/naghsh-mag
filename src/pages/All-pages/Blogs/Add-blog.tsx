import react, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Stack,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
  CircularProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import moment from "jalali-moment";
// images
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Delete, Edit, Launch } from "@mui/icons-material";
// components
import Delete_Blog from "./Delete-blogs/Delete-Blog-component";
// categorys
import { All_Categorys } from "../Data/Filtered_Categorys";

interface BlogProps {
  id: string;
  Title: string;
  Description: string;
  tag: string;
  Image1: null;
  Username: string;
}

interface UserProps {
  id: string;
  username: string;
  email: string;
  password: string;
}

export default function Home() {
  const [previewImage1, setPreviewImage1] = useState<string | null>("");
  const [saveBlog, setSaveBlog] = useState<BlogProps[]>([]);
  const [saveUser, setSaveUser] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [textMessgae, setTextMessgae] = useState("");
  const [loginCookie, setLoginCookie] = useState<string | undefined>(undefined);
  const [tag, setTag] = useState<string>("");
  const [openDeleteBlog, setOpenDeleteBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState({});
  const [registerCookie, setRegisterCookie] = useState<string | undefined>(
    undefined
  );
  const [severity, setSeverity] = useState<
    "success" | "info" | "warning" | "error" | undefined
  >(undefined);

  // farsi time now

  const nowShamsi = moment().locale("fa").format("YYYY/MM/DD");

  useEffect(() => {
    const RegisterURL = "http://192.168.1.103:3001/Register";
    const LoginURL = "http://192.168.1.103:3001/Login";

    const currentLoginCookie = Cookies.get("User-Data");
    const currentRegisterCookie = Cookies.get("New-User");

    setLoginCookie(currentLoginCookie);
    setRegisterCookie(currentRegisterCookie);

    const apiUrl = currentLoginCookie ? LoginURL : RegisterURL;

    axios
      .get("https://67b08ce43fc4eef538e7b8cb.mockapi.io/Nagh_mag_Blog-post")
      .then((res) => {
        setSaveBlog(res.data);
        console.log("ارسال شده : ", res.data);
        setLoading(false);
      })
      .catch((error) => {
        setOpen(true);
        setTextMessgae("خطا در دریافت بلاگ !");
        setSeverity("error");
        setLoading(true);
      });

    axios
      .get(apiUrl)
      .then((res) => {
        setSaveUser(res.data);
        console.log("login data", res.data);
        setLoading(false);
      })
      .catch((error) => {
        setOpen(true);
        setTextMessgae("خطا در دریافت کاربر !");
        setSeverity("error");
        setLoading(true);
      });
  }, [refresh, loginCookie, registerCookie]);

  const FilterBlogs = saveBlog.filter(
    (Userblog: any) => Userblog.Username === saveUser.at(-1)?.username
  );

  const Click_ID_1 = () => {
    document.getElementById("Image_Selcetor_1")?.click();
  };

  //   prewiew image

  const handlePewrview_1 = (event: any) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = new window.Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const maxWidth = 900; // حداکثر عرض تصویر
          const maxHeight = 900; // حداکثر ارتفاع تصویر

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          const base64Image = canvas.toDataURL("image/webp", 0.7);
          setPreviewImage1(base64Image);
        };
      };
    }
  };

  //   form

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      id: "",
      Username: "",
      Title: "",
      Description: "",
      tag: "",
      Image1: null,
      createAt: nowShamsi,
    },
  });

  const Submit_Form = (data: any) => {
    if (previewImage1) {
      data.Image1 = previewImage1;
    }

    const lastUser = saveUser.at(-1);
    if (lastUser?.username) {
      setValue("Username", lastUser.username);
      data.Username = lastUser.username; // اضافه به داده‌های ارسالی
    }

    data.tag = tag;

    axios
      .post(
        "https://67b08ce43fc4eef538e7b8cb.mockapi.io/Nagh_mag_Blog-post",
        data
      )
      .then((res) => {
        console.log("بلاگ : ", res.data);
        reset();
        setPreviewImage1(null);
        setOpen(true);
        setTextMessgae("بلاگ با موفقیت ثبت شد");
        setSeverity("success");
        setRefresh(!refresh);
      })
      .catch((error) => {
        setOpen(true);
        setTextMessgae("خطا در ثبت بلاگ ! , لطفا دوباره تلاش کنید");
        setSeverity("error");
      });
  };

  // فرستادن اخرین کاربر به بلاگ

  // blog content
  const router = useRouter();

  const Blogcontetnt = (blog: BlogProps) => {
    router.push(`/All-pages/Blogs/Blog-content?id=${blog.id}`);
  };

  // one radio

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  // delete blog

  const handleOpenDelete = (blog: any) => {
    setOpenDeleteBlog(true);
    setSelectedBlog(blog);
  };

  if (loading) {
    return (
      <Box className="h-100 flex column justify-center align-center">
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="xl"
      className="flex column justify-center align-center w-100"
      sx={{ mt: { xs: 105, sm: 60 }, mb: 5, maxWidth: "600px" }}
    >
      {loginCookie || registerCookie ? (
        <Box
          className="flex column justify-center align-center gap-15"
          sx={{ mt: 110, width: "100%" }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2,
            }}
            style={{ width: "100%" }}
          >
            <Typography
              variant="h5"
              sx={{
                background:
                  "linear-gradient(45deg,rgb(241, 144, 167) 30%, #FF8E53 90%)",
                fontWeight: 700,
                textAlign: "center",
                py: 1,
                boxShadow: "0px 8px 20px rgb(0,0,0,0.2)",
                borderRadius: "12px",
                p: 1.5,
                width: "100%",
                color: "white",
              }}
            >
              🚀 همین الان بلاگ خودت رو منتشر کن ✍️
            </Typography>
          </motion.div>
          <form
            onSubmit={handleSubmit(Submit_Form)}
            className="flex column justify-center align-center g-5"
            style={{ width: "100%" }}
          >
            <TextField
              label="عنوان بلاگ"
              required
              variant="outlined"
              {...register("Title")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
                width: { xs: "90%", sm: "100%" },
              }}
            />
            <TextField
              label="شرح بلاگ"
              variant="outlined"
              required
              {...register("Description")}
              multiline
              rows={15}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  whiteSpace: "pre-wrap",
                },
                width: { xs: "90%", sm: "100%" },
              }}
            />

            {/* tags */}

            <FormControl component="fieldset">
              <RadioGroup
                name="tag"
                value={tag}
                onChange={handleTagChange}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2,1fr)",
                    sm: "repeat(4,1fr)",
                  },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {All_Categorys.map((item, index) => (
                  <FormControlLabel
                    required
                    key={index}
                    value={item.value}
                    control={<Radio />}
                    label={item.value}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {/* image */}
            <input
              type="file"
              id="Image_Selcetor_1"
              required
              accept="image/*"
              style={{ display: "none" }}
              {...register("Image1", {
                onChange: handlePewrview_1, // استفاده از onChange درون register
              })}
            />
            <Box className="flex row justify-center align-flex-start g-5 w-100">
              <Button
                variant="contained"
                id="Image_Selcetor_1"
                sx={{
                  borderRadius: "10px",
                  fontSize: "15px",
                  p: 1.5,
                  width: "auto",
                }}
                onClick={() => Click_ID_1()}
              >
                آپلود تصویر
              </Button>
              <Image
                alt="first-preview"
                src={previewImage1 || ""}
                width={100}
                height={100}
                style={{
                  borderRadius: "7px",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                  width: "120px",
                  height: "70px",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Button
              variant="contained"
              type="submit"
              color="success"
              disabled={isSubmitting}
              sx={{
                borderRadius: "10px",
                fontSize: "15px",
                p: 1.5,
                width: isSubmitting
                  ? { xs: "10%", sm: "20%" }
                  : { xs: "60%", sm: "25%" },
              }}
            >
              {isSubmitting ? "در حال ثبت" : "ثبت"}
            </Button>
          </form>

          {/* Blogs */}
          <Box className="flex column justify-center align-center g-3 w-100">
            {FilterBlogs.length === 0 ? (
              <motion.div
                initial={{ y: -6 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    background:
                      "linear-gradient(45deg,rgb(230, 241, 144) 30%,rgb(136, 244, 161) 90%)",
                    fontWeight: 700,
                    textAlign: "center",
                    py: 1,
                    boxShadow: "0px 8px 20px rgb(0,0,0,0.2)",
                    borderRadius: "12px",
                    p: 1.5,
                    width: "100%",
                    color: "black",
                  }}
                >
                  اولین بلاگ خودت رو منتشر کن 👇
                </Typography>
              </motion.div>
            ) : (
              <Box
                className="flex justify-center align-center"
                sx={{
                  background:
                    "linear-gradient(45deg,rgb(236, 199, 107) 30%,rgb(234, 168, 246) 90%)",
                  fontWeight: 700,
                  textAlign: "center",
                  py: 1,
                  boxShadow: "0px 8px 20px rgb(0,0,0,0.2)",
                  borderRadius: "12px",
                  p: 1.5,
                  width: "100%",
                  color: "black",
                  gap: { xs: 5, sm: 40 },
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Typography variant="h5">بلاگ های ثبت شده توسط شما</Typography>
                <Typography variant="h5">
                  تعداد بلاگ ها شما : {FilterBlogs.length}
                </Typography>
              </Box>
            )}

            <Stack
              className="flex column justify-flex-start align-center g-3"
              sx={{
                overflowY: "auto",
                height: "500px",
                width: "100%",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                p: 3,
              }}
            >
              <Box className="flex column justify-flex-start align-center w-100">
                {FilterBlogs.map((blog, index) => (
                  <Box
                    className="flex justify-flex-start align-center "
                    sx={{
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      width: "100%",
                      p: 2,
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 0, sm: "auto" },
                    }}
                    key={index}
                  >
                    <Box className="flex row justify-flex-start align-center g-5 w-100">
                      <Image
                        alt="Blog-image"
                        src={blog.Image1 || ""}
                        width={900}
                        height={900}
                        style={{
                          width: "130px",
                          height: "130px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                      <Typography variant="h6">
                        {blog.Title.length > 25
                          ? blog.Title.slice(0, 25)
                              .trim()
                              .replace(/[‌،؛:؟!.\-–—\s]+$/, "") + "..."
                          : blog.Title}
                        {" - "}
                        {blog.Username || ""}
                      </Typography>
                    </Box>

                    {/* btns */}

                    <Box
                      className="flex justify-flex-start align-center"
                      sx={{ flexDirection: { xs: "row", sm: "column" } }}
                    >
                      <Tooltip title="صفحه اصلی بلاگ">
                        <IconButton onClick={() => Blogcontetnt(blog)}>
                          <Launch color="info" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف بلاگ">
                        <IconButton onClick={() => handleOpenDelete(blog)}>
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box className="flex column justify-center align-center h-100">
          <Typography variant="h4">لطفا ابتدا ثبت نام / ورود کنید</Typography>
        </Box>
      )}
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
      {/* delete blog */}
      <Delete_Blog
        openDeleteBlog={openDeleteBlog}
        setOpenDeleteBlog={setOpenDeleteBlog}
        selectedBlog={selectedBlog}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </Container>
  );
}
