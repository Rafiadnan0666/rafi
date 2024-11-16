/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import { Button, Box, Modal, Typography, Card, CardContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faWindowMaximize,
  faWindowRestore,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./../page.css"; // Ensure CSS aligns with Windows XP styles

const house = () => {
  // State hooks
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Event handlers
  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);
  const toggleMinimized = () => setIsMinimized((prev) => !prev);
  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  const openProfileWindow = () => setIsProfileOpen(true);
  const closeProfileWindow = () => setIsProfileOpen(false);
  const openProjectsWindow = () => setIsProjectsOpen(true);
  const closeProjectsWindow = () => setIsProjectsOpen(false);
  const openSpotifyWindow = () => setIsSpotifyOpen(true);
  const closeSpotifyWindow = () => setIsSpotifyOpen(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundImage: "url('https://i.redd.it/lmsj2hl64mw71.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        overflow: "hidden",
        fontFamily: "'Tahoma', sans-serif", // Windows XP font style
      }}
    >
      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar */}
        {isSidebarVisible && (
          <div
            style={{
              width: "200px",
              backgroundColor: "#2c2f8f", // Windows XP sidebar color
              color: "#fff",
              height: "100vh",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#1e1e6a",
                padding: "10px",
                borderRadius: "5px",
                textAlign: "center",
              }}
              onClick={toggleSidebar}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/94/Unofficial_Windows_logo_variant_-_2002%E2%80%932012_(Multicolored).svg"
                alt="Windows XP Logo"
                style={{ width: "30px", marginBottom: "5px" }}
              />
              <Typography>Start</Typography>
            </div>
            <Button
              onClick={openProfileWindow}
              style={{
                width: "100%",
                marginBottom: "10px",
                color: "#fff",
                backgroundColor: "#1e1e6a",
                fontWeight: "bold",
                borderRadius: "5px",
              }}
            >
              My Profile
            </Button>
            <Button
              onClick={openProjectsWindow}
              style={{
                width: "100%",
                marginBottom: "10px",
                color: "#fff",
                backgroundColor: "#1e1e6a",
                fontWeight: "bold",
                borderRadius: "5px",
              }}
            >
              Projects
            </Button>
            <Button
              onClick={openSpotifyWindow}
              style={{
                width: "100%",
                marginBottom: "10px",
                color: "#fff",
                backgroundColor: "#1e1e6a",
                fontWeight: "bold",
                borderRadius: "5px",
              }}
            >
              Spotify
            </Button>
          </div>
        )}

        {/* Main workspace */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Box onClick={openSpotifyWindow} className="folder-icon">
              <Typography className="folder-icon-text">Spotify</Typography>
            </Box>
            <Box onClick={openProfileWindow} className="folder-icon">
              <Typography className="folder-icon-text">Profile</Typography>
            </Box>
            <Box onClick={openProjectsWindow} className="folder-icon">
              <Typography className="folder-icon-text">Projects</Typography>
            </Box>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <div
        className="taskbar"
        style={{
          backgroundColor: "#2c2f8f", // Windows XP taskbar color
          color: "#fff",
          height: "40px",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <div className="start-button" style={{ padding: "5px", cursor: "pointer" }} onClick={toggleSidebar}>
          <Typography>Start</Typography>
        </div>
        <div className="taskbar-buttons" style={{ flexGrow: 1, display: "flex", gap: "10px" }}>
          <Button onClick={openProfileWindow}>My Profile</Button>
          <Button onClick={openProjectsWindow}>Projects</Button>
          <Button onClick={openSpotifyWindow}>Spotify</Button>
        </div>
      </div>

      {/* Profile Modal */}
      <Modal open={isProfileOpen} onClose={closeProfileWindow}>
        <div
          style={{
            backgroundColor: "#fff",
            width: "400px",
            margin: "100px auto",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to right, #5b5b5b, #1e1e6a)",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <Button onClick={closeProfileWindow} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <Button onClick={toggleMinimized} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Button onClick={toggleFullScreen} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={isFullScreen ? faWindowRestore : faWindowMaximize} />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <Typography variant="h6" style={{ margin: "20px" }}>My Profile</Typography>
              <Typography style={{ marginLeft: "20px" }}>Name: Rafi Adnan</Typography>
              <Typography style={{ marginLeft: "20px" }}>Email: fn234561@gmail.com</Typography>
              <Typography style={{ marginLeft: "20px", marginTop: "10px" }}>
                About: Web Developer | Game Developer
              </Typography>
            </>
          )}
        </div>
      </Modal>

      {/* Projects Modal */}
      <Modal open={isProjectsOpen} onClose={closeProjectsWindow}>
        <div
          style={{
            backgroundColor: "#121212",
            width: isFullScreen ? "100vw" : "70vw",
            height: isFullScreen ? "100vh" : "auto",
            margin: "auto",
            borderRadius: "15px",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
            color: "#fff",
            fontFamily: "'Roboto', sans-serif",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to right, #ff7f50, #ff1493)",
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <Button onClick={closeProjectsWindow} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <Button onClick={toggleMinimized} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Button onClick={toggleFullScreen} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={isFullScreen ? faWindowRestore : faWindowMaximize} />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <CardContent>
              <Typography variant="h4" style={{ marginBottom: "20px" }}>
                My Projects
              </Typography>
              <Typography>1. Farkour - Multiplayer Parkour FPS</Typography>
              <Typography>2. Seek the Light - Action-Horror with Parkour Mechanics</Typography>
            </CardContent>
          )}
        </div>
      </Modal>

      {/* Spotify Modal */}
      <Modal open={isSpotifyOpen} onClose={closeSpotifyWindow}>
        <div
          style={{
            backgroundColor: "#1db954",
            width: "60vw",
            height: "40vh",
            margin: "100px auto",
            borderRadius: "15px",
            boxShadow: "0 0 15px rgba(0,0,0,0.4)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              backgroundColor: "#333",
              padding: "10px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              <Button onClick={closeSpotifyWindow} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <Button onClick={toggleMinimized} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Button onClick={toggleFullScreen} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={isFullScreen ? faWindowRestore : faWindowMaximize} />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <div style={{ padding: "15px" }}>
              <Typography variant="h5">Spotify</Typography>
              <Link href="https://open.spotify.com/" target="_blank" style={{ color: "#fff" }}>
                Open Spotify
              </Link>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default house;
