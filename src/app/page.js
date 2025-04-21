"use client";
import { Button, Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faWindowMaximize,
  faWindowRestore,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import House from "./House/House.js";
import Projects from "./Projects/page.js";
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  return (
    <div>
      <title>Rafi Adnan Portoflio</title>
      <link
      className="rounded"
      rel="icon"
      href="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5807b862bf1790ac6b1f82ab75d1be73-1743593947676/af264c2c-8fbc-4003-a5b3-d0b46292c8f8.png"
      type="image/x-icon"
    />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4320225638717558"
     crossorigin="anonymous"></script>
      <House />
      <Projects />
      <Analytics />
    </div>
  );
}
