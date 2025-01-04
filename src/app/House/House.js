"use client";

import { useState } from "react";
import {
  Button,
  Box,
  Modal,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faWindowMaximize,
  faWindowRestore,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./../page.css"; // Ensure CSS aligns with Windows XP styles

const House = () => {
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
  const playlistId = "4tI4bWB5cKvlVEAypIpnn8";
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Artifact Fetching For Dummies",
      description: "You’re a highly trained agent (well, kinda) sent on a mission to steal the galaxy’s most powerful relic: The Artifact. What could go wrong? Oh, just everything. Sneak through a top-secret facility filled with traps, drones, and questionable design choices, all while listening to your boss bark orders over a dodgy intercom. Grab the shiny thing, try not to break it (spoiler: you probably will), and make a mad dash for the exit before the facility turns into your personal barbecue pit. Are you smart enough to survive? Probably not. But hey, it’s worth a shot.",
      image: "https://img.itch.zone/aW1nLzE4Nzk0Njg5LnBuZw==/original/FsHEyg.png",
      id: 1,
      link: "https://gregrsea-975.itch.io/artifact-fetching-for-dummies",
    },
    {
      title: "Landing Page JawaraDM",
      description: "Landing Page JawaraDM",
      image: "https://jawaradm.com/",
      id: 2,
      link: "https://jawaradm.com/",
    },
  ];

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
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.PusjT4SjfvaJ6t5YcHbLawHaHa%26pid%3DApi&f=1&ipt=8622ea1cb90b10d96a066605811e326e27fb12cd021764e42bcf4f66a67034d3&ipo=images"
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
        <div
          className="start-button"
          style={{ padding: "5px", cursor: "pointer" }}
          onClick={toggleSidebar}
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
                <FontAwesomeIcon
                  icon={isFullScreen ? faWindowRestore : faWindowMaximize}
                />
              </Button>
            </div>
            <Typography>My Profile</Typography>
          </div>
          <Card>
            <CardContent>
              <Typography variant="h5">Rafi adnan</Typography>
              <Typography variant="body1" paragraph>
                Full-stack developer, web enthusiast, and digital problem solver
                passionate about creating modern, intuitive digital experiences.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Modal>

      {/* Projects Modal */}
      <Modal open={isProjectsOpen} onClose={closeProjectsWindow}>
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
              <Button onClick={closeProjectsWindow} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <Button onClick={toggleMinimized} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Button onClick={toggleFullScreen} style={{ color: "#fff" }}>
                <FontAwesomeIcon
                  icon={isFullScreen ? faWindowRestore : faWindowMaximize}
                />
              </Button>
            </div>
            <Typography>Projects</Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            {projects.map((project) => (
              <Card key={project.id} style={{ marginBottom: "10px" }}>
                <CardContent>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="body2" paragraph>
                    {project.description}
                  </Typography>
                  <Link
                    href={project.link}
                    target="_blank"
                    style={{
                      color: "#1e1e6a",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    View Project
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Modal>

      {/* Spotify Modal */}
      <Modal open={isSpotifyOpen} onClose={closeSpotifyWindow}>
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
              <Button onClick={closeSpotifyWindow} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <Button onClick={toggleMinimized} style={{ color: "#fff" }}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Button onClick={toggleFullScreen} style={{ color: "#fff" }}>
                <FontAwesomeIcon
                  icon={isFullScreen ? faWindowRestore : faWindowMaximize}
                />
              </Button>
            </div>
            <Typography>Spotify</Typography>
          </div>
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}`}
            width="100%"
            height="380"
            frameBorder="0"
            allow="encrypted-media"
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default House;
