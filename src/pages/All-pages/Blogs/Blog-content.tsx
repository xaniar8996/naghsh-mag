import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/image";
import axios from "axios";

interface BlogProps {
  id: string;
  Title: string;
  Description: string;
  tag: string;
  Image1: null;
  Username: string;
}

export default function BlogContent() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [saveBlog, setSaveBlog] = useState<any>([]);

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://67b08ce43fc4eef538e7b8cb.mockapi.io/Nagh_mag_Blog-post/${id}`
        )
        .then((response) => {
          setBlog(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching blog:", error);
          setLoading(true);
        });
    }

    axios
      .get("https://67b08ce43fc4eef538e7b8cb.mockapi.io/Nagh_mag_Blog-post")
      .then((res) => {
        // فیلتر کردن بلاگ فعلی و مرتب سازی بر اساس id به صورت نزولی
        const filteredBlogs = res.data
          .filter((item: any) => item.id !== id)
          .sort((a: any, b: any) => parseInt(b.id) - parseInt(a.id)); // مرتب سازی نزولی

        // گرفتن 3 مورد آخر
        const latestBlogs = filteredBlogs.slice(0, 3);
        setSaveBlog(latestBlogs);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    );
  }

  const Blogcontetnt = (blog: BlogProps) => {
    router.push(`/All-pages/Blogs/Blog-content?id=${blog.id}`);
  };

  return (
    <Box
      className="flex justify-center align-flex-start"
      sx={{
        p: 5,
        flexDirection: { xs: "column", sm: "row" },
        mt:
          saveBlog.length === 3
            ? { xs: 270, sm: 125 }
            : saveBlog.length < 3
            ? { xs: 200, sm: 105 }
            : 0,
      }}
    >
      <Box
        className="flex column justify-center align-center gap-10"
        sx={{
          mt: 7,
          p: 5,
        }}
      >
        <Box
          sx={{
            width: { xs: "150%", sm: "100%" },
            height: { xs: "auto", sm: "500px" },
          }}
        >
          <Image
            src={blog.Image1}
            alt="image"
            width={0}
            height={0}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "24px",
              boxShadow: "0px 8px 20px rgb(0,0,0,0.1)",
              filter: "brightness(80%)",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          className="flex column justify-flex-start align-flex-start gap-5"
          sx={{ width: { xs: "140%", sm: "auto" } }}
        >
          <Box className="flex column justify-flex-start align-flex-start gap-1">
            <Typography
              variant="h4"
              sx={{
                background:
                  "linear-gradient(45deg,rgb(180, 117, 249) 30%,rgb(103, 123, 250) 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                textAlign: "center",
                py: 1,
              }}
            >
              {blog.Title}
            </Typography>
            <Box className="flex row justify-flex-start align-flex-start gap-5">
              <Typography
                variant="h6"
                sx={{
                  background:
                    "linear-gradient(45deg,rgb(205, 172, 88) 30%,rgb(64, 138, 145) 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {blog.createAt}
              </Typography>
              <Typography variant="h6">
                <b style={{ color: "gray" }}>نویسنده : </b> {blog.Username}
              </Typography>
              <Typography variant="h6">
                <b
                  style={{
                    color: "gray",
                  }}
                >
                  موضوع :{" "}
                </b>{" "}
                {blog.tag}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: "28px", // مقدار کمتر برای جلوگیری از افزایش ارتفاع بیش از حد
              minHeight: "200px", // مقدار حداقلی برای نگه‌داشتن ارتفاع ثابت
              width: { xs: "100%", sm: "100%" },
              overflowY: "auto", // اضافه شده برای اسکرول در صورت نیاز
              maxHeight: "550px", // محدودیت ارتفاع برای اسکرول
            }}
          >
            {blog.Description}
          </Typography>
        </Box>
      </Box>

      {/* suggested cards */}

      <Box
        className="flex column justify-center align-center g-5"
        sx={{ p: 2 }}
      >
        <Typography
          variant="h5"
          sx={{
            mt: 10,
          }}
        >
          پست های اخیر وبلاگ ها
        </Typography>
        {saveBlog.map((blog: any, index: any) => (
          <Card
            key={index}
            sx={{
              width: { xs: "100%", sm: "320px" },
              height: { xs: "auto", sm: "auto" },
              borderRadius: "16px",
              boxShadow: "0px 8px 20px rgb(0 , 0, 0, 0.1)",
            }}
          >
            <CardMedia>
              {blog.Image1 && (
                <Image
                  className=" object-cover group-hover:scale-95 transition-transform duration-300 "
                  src={blog.Image1 || ""}
                  alt="image"
                  width={350}
                  height={400}
                  style={{
                    boxShadow: "0px 8px 20px rgb(0 , 0, 0, 0.1)",
                    height: "200px",
                    cursor: "pointer",
                  }}
                />
              )}
            </CardMedia>
            <CardContent
              className="flex column justify-flex-start align-flex-start g-5"
              sx={{ p: 2 }}
            >
              <Typography variant="h5">{blog.Title}</Typography>
              <Typography variant="body1" sx={{ color: "gray" }}>
                {blog.Description.length > 20
                  ? blog.Description.slice(0, 70) + "..."
                  : blog.Description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="text"
                onClick={() => Blogcontetnt(blog)}
                sx={{ width: "40%", p: 1, mt: 1.5, borderRadius: "10px" }}
              >
                بیشتر بدانید
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
