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
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4320225638717558"
     crossorigin="anonymous"></script>
      <House />
      <Projects />
      <Analytics />
    </div>
  );
}
