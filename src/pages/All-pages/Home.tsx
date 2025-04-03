import { Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Box
      className="flex row justify-center align-cente g-10 h-100 w-100"
      sx={{ mt: 30 }}
    >
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
        <Box className="flex column justify-center align-flex-start g-5">
          <Typography variant="h2" color="primary">
            نقش مگ
          </Typography>
          <Typography variant="h4" color="primary" sx={{ lineHeight: "60px" }}>
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
          </motion.div>
        </Box>

        {/* image */}
        <Box className="flex row justify-center align-center g-5 mt-50">
          <img
            src="/hero/hero.gif"
            alt="image"
            width={1000}
            height={1000}
            style={{
              width: "600px",
              height: "600px",
            }}
          />
        </Box>
      </motion.div>
    </Box>
  );
}
