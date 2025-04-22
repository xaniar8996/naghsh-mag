import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
// icons
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
// image
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Menu, Telegram, X } from "@mui/icons-material";
// mobile menu
import Mobile_Menu from "./All-pages/Mobile-Menu";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const Layout = ({ children }: any) => {
  const [user, setUser] = useState<User[]>([]);
  const [loginCookie, setLoginCookie] = useState<string | undefined>(undefined);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [registerCookie, setRegisterCookie] = useState<string | undefined>(
    undefined
  );

  const Btns = [
    {
      name: "خانه",
      link: "/All-pages/Home",
    },
    {
      name: "بلاگ ها",
      link: "/All-pages/Blogs",
    },
    {
      name: "افزودن بلاگ",
      link: "/All-pages/Blogs/Add-blog",
    },
  ];

  // social media

  const Social_media = [
    {
      icon: <Telegram />,
      title: "تلگرام",
    },
    {
      icon: <Instagram />,
      title: "اینستاگرام",
    },
    {
      icon: <X />,
      title: "توییر ( شبکه X )",
    },
  ];

  //   pathname
  const Pathname = usePathname();

  if (Pathname === "/All-pages/Auth/Login") {
    return <>{children}</>;
  }

  // fetching users
  useEffect(() => {
    const RegisterURL = "http://192.168.1.103:3001/Register";
    const LoginURL = "http://192.168.1.103:3001/Login";

    const currentLoginCookie = Cookies.get("User-Data");
    const currentRegisterCookie = Cookies.get("New-User");

    setLoginCookie(currentLoginCookie);
    setRegisterCookie(currentRegisterCookie);

    const apiUrl = currentLoginCookie ? LoginURL : RegisterURL;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${
            currentLoginCookie ?? currentRegisterCookie
          }`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(console.error);
  }, [loginCookie, registerCookie]); // اضافه کردن وابستگی‌ها

  return (
    <Box className="flex column justify-center align-center h-100 w-100">
      <AppBar
        className="flex row justify-center align-center "
        sx={{
          bgcolor: "white",
          gap: { xs: 2, sm: 80 },
        }}
      >
        <Toolbar
          className="flex row justify-center align-center g-5"
          sx={{ p: 1.5 }}
        >
          <IconButton
            onClick={() => setOpenDrawer(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon sx={{ fontSize: 35, color: "black" }} />
          </IconButton>
          <Image
            alt="logo"
            src="/Login/logo (2).png"
            width={60}
            height={60}
            style={{
              borderRadius: "10px",
            }}
          />
          {Btns.map((btn, index) => (
            <Link href={btn.link} key={index}>
              <motion.div
                whileHover={{
                  transform: "translateY(-5px)",
                  boxShadow: "3px 3px 0px yellow",
                }}
                style={{
                  borderRadius: "7px",
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    color: Pathname === btn.link ? "white" : "black",
                    borderRadius: "7px",
                    bgcolor: Pathname === btn.link ? "black" : "white",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {btn.name}
                </Button>
              </motion.div>
            </Link>
          ))}
        </Toolbar>
        <Toolbar className="flex row justify-center align-center g-3 ">
          <AccountCircleIcon sx={{ fontSize: "40px"  , color:"black"}} />
          {loginCookie || registerCookie ? (
            <Typography variant="h6" sx={{ color: "black" }}>
              {user.at(-1)?.username}
            </Typography>
          ) : (
            <Link href="/All-pages/Auth/Login">
              <Button
                className="flex row justify-center align-center g-3"
                variant="text"
                sx={{ color: "black", borderRadius: "7px" }}
              >
                <PersonIcon sx={{ color: "black", fontSize: "30px" }} />
                ورود | ثبت نام
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <Box>{children}</Box>

      {/* footer */}
      <footer
        className="flex column justify-center align-center g-5"
        style={{
          backgroundColor: "#222",
          color: "white",
          width: "100%",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <Box
          className="flex justify-center align-center"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 5, sm: 100 },
          }}
        >
          <Box className="flex row justify-center align-center g-5">
            <Image
              alt="logo"
              src="/Login/logo (2).png"
              width={60}
              height={60}
              style={{
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />
            <Typography variant="h5" color="white">
              نقش مگ
            </Typography>
          </Box>
          <Box className="flex row justify-center align-center g-5">
            {Social_media.map((item, index) => (
              <motion.div
                whileHover={{
                  boxShadow: "3px 3px 0px yellow",
                }}
                transition={{
                  repeatType: "reverse",
                }}
                style={{
                  borderRadius: "100%",
                }}
              >
                <Tooltip title={item.title} key={index}>
                  <IconButton sx={{ color: "white" }}>{item.icon}</IconButton>
                </Tooltip>
              </motion.div>
            ))}
          </Box>
        </Box>

        <Typography variant="body2" sx={{ opacity: 0.7, marginTop: "10px" }}>
          © 2025 تمامی حقوق محفوظ است.
        </Typography>
      </footer>
      <Mobile_Menu openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </Box>
  );
};
