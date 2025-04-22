import React, { Dispatch, SetStateAction } from "react";
import { Typography, Box, Drawer, Button } from "@mui/material";
// images
import Image from "next/image";
import Link from "next/link";

type OpenMenuProps = {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
};

export default function Menu_Mobile(props: OpenMenuProps) {
  // nav items
  const NavSections = [
    {
      lable: "خانه",
      path: "/All-pages/Home",
    },
    {
      lable: "بلاگ ها",
      path: "/All-pages/Blogs",
    },
    {
      lable: "افزودن بلاگ",
      path: "/All-pages/Blogs/Add-blog",
    },
  ];

  return (
    <Drawer
      open={props.openDrawer}
      onClose={() => props.setOpenDrawer(false)}
      anchor="left"
      PaperProps={{
        sx: {
          width: "70%",
        },
      }}
    >
      {/* TItle */}
      <Box className="flex row justify-center align-center" sx={{ p: 2 }}>
        <Image
          alt="logo"
          src="/Login/logo (2).png"
          width={80}
          height={80}
          style={{ borderRadius: "10px" }}
        />
      </Box>
      {/* nav items */}
      <Box
        className="flex column justify-flex-start align-center g-5"
        sx={{ p: 3 }}
      >
        {NavSections.map((item, index) => (
          <Link href={item.path} style={{width:"100%"}}>
            <Button
              variant="text"
              key={index}
              onClick={() => props.setOpenDrawer(false)}
              sx={{
                color: "black",
                p: 1.5,
                fontSize: "18px",
                borderRadius: "16px",
                transition: "all 0.3s",
                width: "100%",
                "&:hover": { color: "white", backgroundColor: "black" },
              }}
            >
              {item.lable}
            </Button>
          </Link>
        ))}
      </Box>
    </Drawer>
  );
}
