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
  const [loading, setLoading] = useState(true);
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
        const CurrentBlog = res.data.filter((item: any) => item.id !== id);
        const FilterBlogs = CurrentBlog.slice(0, 3);
        setSaveBlog(FilterBlogs);
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
        <CircularProgress size={80} />
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
        mt:120
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
        <Box className="flex column justify-flex-start align-flex-start gap-5">
          <Box className="flex column justify-flex-start align-flex-start gap-1">
            <Typography
              variant="h4"
              sx={{
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                textAlign: "center",
                py: 1,
              }}
            >
              {blog.Title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "gray",
              }}
            >
              {blog.Username}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: "28px", // مقدار کمتر برای جلوگیری از افزایش ارتفاع بیش از حد
              mشطHeight: "200px", // مقدار حداقلی برای نگه‌داشتن ارتفاع ثابت
              width: { xs: "100%", sm: "100%" },
              overflowY: "auto", // اضافه شده برای اسکرول در صورت نیاز
              maxHeight: "400px", // محدودیت ارتفاع برای اسکرول
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
              width: { xs: "300px", sm: "320px" },
              height: { xs: "auto", sm: "auto" },
              borderRadius: "16px",
              boxShadow: "0px 8px 20px rgb(0 , 0, 0, 0.1)",
            }}
          >
            <CardContent
              className="flex column justify-flex-start align-flex-start g-5"
              sx={{ p: 2 }}
            >
              <Image
                className=" object-cover group-hover:scale-95 transition-transform duration-300 rounded-md"
                src={blog.Image1 || ""}
                alt="image"
                width={300}
                height={400}
                style={{
                  borderRadius: "16px",
                  boxShadow: "0px 8px 20px rgb(0 , 0, 0, 0.1)",
                  height: "200px",
                  cursor: "pointer",
                }}
              />
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
