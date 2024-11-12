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
import "./../page.css"; // Make sure your CSS reflects the Windows XP styles

const house = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar visibility state

  const openProfileWindow = () => setIsProfileOpen(true);
  const closeProfileWindow = () => setIsProfileOpen(false);
  const openProjectsWindow = () => setIsProjectsOpen(true);
  const closeProjectsWindow = () => setIsProjectsOpen(false);
  const openSpotifyWindow = () => setIsSpotifyOpen(true);
  const closeSpotifyWindow = () => setIsSpotifyOpen(false);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
    setIsMinimized(false);
  };

  const toggleMinimized = () => {
    setIsMinimized((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

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
        fontFamily: "'Tahoma', sans-serif", // Windows XP font
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar with Start Button */}
        {isSidebarVisible && (
          <div
            style={{
              width: "200px",
              backgroundColor: "#2c2f8f", // Windows XP color
              color: "#fff",
              height: "100vh",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "15px",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#1e1e6a", // Windows XP Start button color
                padding: "10px",
                borderRadius: "5px",
                textAlign: "center",
              }}
              onClick={toggleSidebar} // Hide the sidebar when clicked
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/94/Unofficial_Windows_logo_variant_-_2002%E2%80%932012_(Multicolored).svg"
                alt="Windows XP Logo"
                style={{ width: "30px", marginBottom: "5px" }}
              />
              <Typography>Start</Typography>
            </div>
            <div>
              <Button
                onClick={openProfileWindow}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  color: "#fff",
                  backgroundColor: "#1e1e6a", // XP button color
                  fontWeight: "bold",
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
                }}
              >
                Spotify
              </Button>
            </div>
          </div>
        )}

        {/* Content Area */}
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

      {/* Taskbar (Start Button and running apps) */}
      <div
        className="taskbar"
        style={{
          backgroundColor: "#2c2f8f", // Classic Windows XP taskbar color
          color: "#fff",
          height: "40px",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
        }}
      >
        <div
          className="start-button"
          style={{ padding: "5px", cursor: "pointer" }}
          onClick={toggleSidebar} // Toggle sidebar visibility
        >
          <Typography>Start</Typography>
        </div>
        <div
          className="taskbar-buttons"
          style={{ flexGrow: 1, display: "flex", gap: "10px" }}
        >
          <Button onClick={openProfileWindow}>My Profile</Button>
          <Button onClick={openProjectsWindow}>Projects</Button>
          <Button onClick={openSpotifyWindow}>Spotify</Button>
        </div>
      </div>

      {/* Profile Modal */}
      <Modal open={isProfileOpen} onClose={closeProfileWindow}>
        <div className={`modal-content ${isFullScreen ? "fullscreen" : ""}`}>
          <div className="modal-content-header bg-slate-600 min-h-12">
            <Button onClick={closeProfileWindow} style={{ color: "red" }}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <div>
              <Button onClick={toggleMinimized} style={{ color: "gray" }} />
              <Button onClick={toggleFullScreen} style={{ color: "gray" }}>
                <FontAwesomeIcon
                  icon={isFullScreen ? faWindowRestore : faWindowMaximize}
                />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <Typography variant="h4">My Profile</Typography>
              <Typography variant="body2" style={{ marginTop: "20px" }}>
                Name: Rafi Adnan
              </Typography>
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                Email: fn234561@gmail.com
              </Typography>
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                I am passionate about web and game development, and I have experience
                working with Unity, Laravel, and other technologies.
              </Typography>
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                I enjoy creating immersive gaming experiences and have expertise in
                multiplayer functionality, AI, and game mechanics.
              </Typography>
              <Button
                onClick={closeProfileWindow}
                style={{ marginTop: "20px" }}
              >
                Close
              </Button>
            </>
          )}
        </div>
      </Modal>

      {/* Projects Modal */}
      <Modal open={isProjectsOpen} onClose={closeProjectsWindow}>
        <div className={`modal-content ${isFullScreen ? "fullscreen" : ""}`}>
          <div className="modal-content-header bg-slate-600 min-h-12">
            <Button onClick={closeProjectsWindow} style={{ color: "red" }}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <div>
              <Button onClick={toggleMinimized} style={{ color: "gray" }} />
              <Button onClick={toggleFullScreen} style={{ color: "gray" }}>
                <FontAwesomeIcon
                  icon={isFullScreen ? faWindowRestore : faWindowMaximize}
                />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <Typography variant="h4" style={{ marginTop: "20px" }}>
                Projects
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Card style={{ width: "200px" }}>
                  <CardContent>
                    <Typography variant="h6">Farkour</Typography>
                    <Typography variant="body2">
                      A multiplayer parkour FPS featuring katanas as the only weapon.
                    </Typography>
                  </CardContent>
                </Card>
                <Card style={{ width: "200px" }}>
                  <CardContent>
                    <Typography variant="h6">Seek the Light</Typography>
                    <Typography variant="body2">
                      A horror-action game with parkour mechanics and an inventory system.
                    </Typography>
                  </CardContent>
                </Card>
                <Card style={{ width: "200px" }}>
                  <CardContent>
                    <Typography variant="h6">Kopi Jawara</Typography>
                    <Typography variant="body2">
                      A project focusing on Arabica and Robusta coffee from Banten.
                    </Typography>
                  </CardContent>
                </Card>
              </div>
              <Button onClick={closeProjectsWindow} style={{ marginTop: "20px" }}>
                Close
              </Button>
            </>
          )}
        </div>
      </Modal>

      {/* Spotify Modal */}
      <Modal open={isSpotifyOpen} onClose={closeSpotifyWindow}>
        <div className={`modal-content ${isFullScreen ? "fullscreen" : ""}`}>
          <div className="modal-content-header bg-slate-600 min-h-12">
            <Button onClick={closeSpotifyWindow} style={{ color: "red" }}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <div>
              <Button onClick={toggleMinimized} style={{ color: "gray" }} />
              <Button onClick={toggleFullScreen} style={{ color: "gray" }}>
                <FontAwesomeIcon
                  icon={isFullScreen ? faWindowRestore : faWindowMaximize}
                />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <>
              <Typography variant="h4" style={{ marginTop: "20px" }}>
                Spotify
              </Typography>
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                Embed Spotify player here!
              </Typography>
              <Button
                onClick={closeSpotifyWindow}
                style={{ marginTop: "20px" }}
              >
                Close
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default house;
