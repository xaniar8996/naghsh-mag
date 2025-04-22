import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Typography,
  Box,
  Container,
  Fab,
  AppBar,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CircularProgress,
  Pagination,
  Button,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
// image
import Image from "next/image";
import { AccountCircle } from "@mui/icons-material";
import { Filter_Categorys } from "./Data/Filtered_Categorys";

interface BlogProps {
  id: string;
  Title: string;
  Description: string;
  tag: string;
  Image1: string;
  Username: string;
}

export default function Home() {
  // fetch blogs from API
  const [allBlogs, setAllBlogs] = useState<BlogProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategory, setShowCategory] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [originalBlogs, setOriginalBlogs] = useState<BlogProps[]>([]);
  const blogsPerPage = 6;

  const handleCategoryClick = () => {
    setShowCategory(!showCategory);
  };

  useEffect(() => {
    axios
      .get("https://67b08ce43fc4eef538e7b8cb.mockapi.io/Nagh_mag_Blog-post")
      .then((res) => {
        setAllBlogs(res.data);
        setOriginalBlogs(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(true);
      });
  }, []);

  if (loading) {
    return (
      <Box className="h-100 flex column justify-center align-center">
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    );
  }

  // Calculate current blogs to display
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // blog content
  const router = useRouter();

  const Blogcontetnt = (blog: BlogProps) => {
    router.push(`/All-pages/Blogs/Blog-content?id=${blog.id}`);
  };

  if (allBlogs.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5" color="black">
          در حال حاضر هیچ بلاگی وجود ندارد
        </Typography>
      </Box>
    );
  }

  // filter button

  // filter

  const handleFilter = (category: any) => {
    setActiveFilter(category.value);
    const filtered = originalBlogs.filter((blog) =>
      blog.tag.includes(category.value)
    );
    setAllBlogs(filtered);
    setCurrentPage(1); // برگرد به صفحه اول
    setShowCategory(false);
  };

  return (
    <Box
      sx={{ mb: 10, mt: { xs: 510, sm: 145 } }}
      className="flex column justify-flex-start align-center g-5"
    >
      <Box
        className="flex justify-center align-flex-end"
        sx={{
          p: 2,
          mb: 5,
          background: "none",
          boxShadow: "none",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 3, sm: 110 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            background:
              "linear-gradient(45deg,rgb(144, 157, 241) 30%,rgb(183, 186, 27) 90%)",
            fontWeight: 700,
            textAlign: "center",
            py: 1,
            boxShadow: "0px 8px 20px rgb(0,0,0,0.2)",
            borderRadius: "12px",
            p: 1.5,
            width: { xs: "350px", sm: "400px" },
            color: "white",
            height: "100%",
          }}
        >
          همه بلاگ ها
        </Typography>
        <Box
          className="flex row-reverse justify-center align-center gap-2"
          sx={{ position: "relative" }}
        >
          <Box className="flex column justify-center align-center gap-2">
            <Tooltip title="فیلتر کردن بلاگ ها" arrow>
              <Fab onClick={handleCategoryClick}>
                <FilterAltIcon sx={{ color: "black" }} />
              </Fab>
            </Tooltip>
            <Box
              className="column justify-center align-center"
              sx={{
                display: showCategory ? "grid" : "none",
                position: "absolute",
                background:
                  "linear-gradient(45deg,rgb(144, 228, 241) 30%,rgb(245, 132, 213) 90%)",
                mt: { xs: 50, sm: 45 },
                borderRadius: "16px",
                p: 1,
                width: { xs: "400px", sm: "500px" },
                gridTemplateColumns: "repeat(4,1fr)",
                mr: { xs: 36.5, sm: 35 },
              }}
            >
              {Filter_Categorys.map((category, index) => (
                <motion.div
                  whileHover={{
                    transform: "translateY(-5px)",
                    backgroundColor: "black",
                  }}
                  key={index}
                  style={{ borderRadius: "8px", width: "100%" }}
                >
                  <Button
                    variant="text"
                    color="primary"
                    sx={{
                      p: 1.5,
                      borderRadius: "8px",
                      width: "100%",
                      ":hover": { color: "white" },
                    }}
                    onClick={() => handleFilter(category)}
                  >
                    {category.value}
                  </Button>
                </motion.div>
              ))}
            </Box>
          </Box>
          {activeFilter && (
            <Box
              className="flex row justify-space-between align-center"
              sx={{
                p: 1,
                px: 2,
                borderRadius: "12px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                position: "absolute",
                mr: 45,
                width: "230px",
              }}
            >
              <Typography variant="body1" sx={{ mr: 1 }}>
                {activeFilter}
              </Typography>
              <Button
                size="small"
                onClick={() => {
                  setActiveFilter(null);
                  setAllBlogs(originalBlogs);
                  setCurrentPage(1);
                  setShowCategory(false);
                }}
                sx={{
                  minWidth: "30px",
                  color: "red",
                  fontWeight: "bold",
                  ml: 1,
                }}
              >
                ✕
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* BLOGS */}

      <Box
        sx={{
          height: { xs: "470vh", sm: "135vh" },
          mb: 25,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(3, 1fr)" },
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          {currentBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  height: "520px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  className="flex row justify-space-between align-center gap-25"
                  p={1}
                >
                  <Box className="flex row justify-flex-start align-center gap-2">
                    <AccountCircle sx={{ fontSize: 35 }} />
                    <Typography variant="body1">{blog.Username}</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontStyle: "italic", color: "gray" }}
                  >
                    {`خواندن: ${Math.ceil(
                      blog.Description.trim().split(/\s+/).length / 200
                    )} دقیقه`}
                  </Typography>
                </Box>
                <CardMedia>
                  {blog.Image1 && (
                    <Image
                      src={blog.Image1}
                      alt={blog.Title}
                      width={345}
                      height={200}
                      style={{
                        objectFit: "cover",
                        cursor: "pointer",
                        height: "28vh",
                      }}
                      onClick={() => Blogcontetnt(blog)}
                    />
                  )}
                </CardMedia>
                <CardContent className="flex column justify-flex-start align-flex-start gap-4">
                  <Typography variant="h5">{blog.Title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.Description.slice(0, 100)}
                    {blog.Description.length > 100 ? " ...  " : ""}
                  </Typography>
                </CardContent>
                <CardActions>
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: "7px 7px 0px yellow",
                      backgroundColor: "black",
                    }}
                    style={{
                      borderRadius: "8px",
                    }}
                  >
                    <Button
                      variant="text"
                      color="primary"
                      sx={{
                        p: 1.5,
                        borderRadius: "8px",
                        width: "150px",
                        ":hover": { color: "white" },
                      }}
                      onClick={() => Blogcontetnt(blog)}
                    >
                      مشاهده بیشتر
                    </Button>
                  </motion.div>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* PAGINATION */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(allBlogs.length / blogsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "black",
              fontSize: "1.2rem",
            },
            "& .Mui-selected": {
              backgroundColor: "rgb(144, 157, 241)",
              color: "white",
            },
          }}
        />
      </Box>
    </Box>
  );
}
