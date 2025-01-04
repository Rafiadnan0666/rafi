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
      <House />
      <Projects />
      <Analytics />
    </div>
  );
}
