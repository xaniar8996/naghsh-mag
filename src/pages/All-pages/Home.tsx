import { Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <motion.div
      className="flex row justify-center align-center g-10"
      initial={{ opacity: 0, x: -110 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        type: "spring",
        stiffness: 90,
        damping: 12,
      }}
    >
      <Box
        className="flex justify-center align-center h-100 w-100"
        sx={{
          mt: { xs: 30, sm: 30 },
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: { xs: 1, sm: 20 },
          mb: { xs: 20, sm: 0 },
        }}
      >
        <Box
          className="flex column justify-center align-flex-start g-5"
          sx={{ width: { xs: "80%", sm: "auto" } }}
        >
          <Typography
            variant="h2"
            color="primary"
            sx={{ fontSize: { xs: 50, sm: "auto" } }}
          >
            نقش مگ
          </Typography>
          <Typography
            variant="h4"
            color="primary"
            sx={{ lineHeight: "60px", fontSize: { xs: 30, sm: "auto" } }}
          >
            جایی برای به اشتراک گذاشتن ایده ها و <br />
            افکار شما 🙂💬
          </Typography>
          <motion.div
            whileHover={{
              transform: "translateY(-5px)",
              boxShadow: "7px 7px 0px yellow",
            }}
            transition={{
              repeatType: "reverse",
            }}
            style={{
              borderRadius: "10px",
            }}
          >
            <Link href="/All-pages/Blogs/Add-blog">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "250px",
                  p: 1.5,
                  borderRadius: "10px",
                  fontSize: "17px",
                }}
              >
                ایده‌هات رو به اشتراک بگذار!
              </Button>
            </Link>
          </motion.div>
        </Box>

        {/* image */}
        <Box
          className="flex row justify-center align-center g-5"
          sx={{ mt: { xs: 30, sm: 0 }, width: { xs: "100%", sm: "600px" } }}
        >
          <img
            src="/hero/hero.gif"
            alt="image"
            width={1000}
            height={1000}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
}
