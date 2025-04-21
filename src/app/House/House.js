"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMinus,
  faWindowMaximize,
  faWindowRestore,
  faTimes,
  faFolder,
  faMusic,
  faUser,
  faGamepad,
  faGlobe,
  faCode,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./../page.css";

const PortXFolio = () => {
  // State hooks
  const [windows, setWindows] = useState({
    profile: { open: false, minimized: false, fullscreen: false, zIndex: 1 },
    projects: { open: false, minimized: false, fullscreen: false, zIndex: 2 },
    spotify: { open: false, minimized: false, fullscreen: false, zIndex: 3 },
    games: { open: false, minimized: false, fullscreen: false, zIndex: 4 },
    minesweeper: { open: false, minimized: false, fullscreen: false, zIndex: 5 },
    snake: { open: false, minimized: false, fullscreen: false, zIndex: 6 },
    aiChat: { open: false, minimized: false, fullscreen: false, zIndex: 7 },
  });
  const [activeWindow, setActiveWindow] = useState(null);
  const [time, setTime] = useState(new Date());
  const [gameScore, setGameScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gamePosition, setGamePosition] = useState({ x: 50, y: 50 });
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [minesweeperGrid, setMinesweeperGrid] = useState([]);
  const [revealedCells, setRevealedCells] = useState([]);
  const [flaggedCells, setFlaggedCells] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const snakeRef = useRef();
  const gameAreaRef = useRef();

  // Initialize Minesweeper
  useEffect(() => {
    if (windows.minesweeper.open && minesweeperGrid.length === 0) {
      initializeMinesweeper();
    }
  }, [windows.minesweeper.open]);

  // Snake game logic
  useEffect(() => {
    if (!windows.snake.open || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        switch (direction) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
        }

        // Check collision with walls
        if (
          head.x < 0 ||
          head.x >= 20 ||
          head.y < 0 ||
          head.y >= 20
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check collision with self
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
          setGameScore(prev => prev + 10);
          setFood({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [direction, gameOver, food, windows.snake.open]);

  // Handle keyboard controls for Snake
  useEffect(() => {
    if (!windows.snake.open) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, windows.snake.open]);

  // Initialize Minesweeper
  const initializeMinesweeper = () => {
    const grid = Array(10).fill().map(() => Array(10).fill(0));
    let mines = 15;

    // Place mines
    while (mines > 0) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (grid[y][x] !== "M") {
        grid[y][x] = "M";
        mines--;
      }
    }

    // Calculate numbers
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (grid[y][x] === "M") continue;

        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (
              y + dy >= 0 &&
              y + dy < 10 &&
              x + dx >= 0 &&
              x + dx < 10 &&
              grid[y + dy][x + dx] === "M"
            ) {
              count++;
            }
          }
        }
        grid[y][x] = count;
      }
    }

    setMinesweeperGrid(grid);
    setRevealedCells([]);
    setFlaggedCells([]);
    setGameWon(false);
    setGameLost(false);
  };

  // Reveal cell in Minesweeper
  const revealCell = (x, y) => {
    if (flaggedCells.includes(`${x},${y}`) || revealedCells.includes(`${x},${y}`)) return;
    if (gameWon || gameLost) return;

    const newRevealed = [...revealedCells, `${x},${y}`];
    setRevealedCells(newRevealed);

    if (minesweeperGrid[y][x] === "M") {
      setGameLost(true);
      return;
    }

    // Auto-reveal empty cells
    if (minesweeperGrid[y][x] === 0) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (
            y + dy >= 0 &&
            y + dy < 10 &&
            x + dx >= 0 &&
            x + dx < 10 &&
            !newRevealed.includes(`${x + dx},${y + dy}`)
          ) {
            revealCell(x + dx, y + dy);
          }
        }
      }
    }

    // Check win condition
    let unrevealed = 0;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (minesweeperGrid[y][x] !== "M" && !newRevealed.includes(`${x},${y}`)) {
          unrevealed++;
        }
      }
    }
    if (unrevealed === 0) {
      setGameWon(true);
    }
  };

  // Toggle flag in Minesweeper
  const toggleFlag = (x, y, e) => {
    e.preventDefault();
    if (revealedCells.includes(`${x},${y}`)) return;

    if (flaggedCells.includes(`${x},${y}`)) {
      setFlaggedCells(flaggedCells.filter(cell => cell !== `${x},${y}`));
    } else {
      setFlaggedCells([...flaggedCells, `${x},${y}`]);
    }
  };

  // AI Chat response
  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setIsThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Im an AI assistant in this Windows XP portfolio. How can I help you?",
        "Rafi is a full-stack developer with expertise in React, Laravel, and Unity.",
        "Check out the Games section for some nostalgic Windows XP-style games!",
        "This portfolio showcases innovative web technologies and interactive elements.",
        "The Minesweeper and Snake games are fully functional. Try them out!",
        "Rafi is currently working on a sci-fi roguelike shooter called Starfall."
      ];
      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsThinking(false);
    }, 1500);
  };

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Window management functions
  const openWindow = (windowName) => {
    setWindows(prev => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        open: true,
        minimized: false,
        zIndex: Object.values(prev).reduce((max, w) => Math.max(max, w.zIndex), 0) + 1,
      }
    }));
    setActiveWindow(windowName);
  };

  const closeWindow = (windowName) => {
    setWindows(prev => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        open: false,
      }
    }));
    if (activeWindow === windowName) setActiveWindow(null);
  };

  const toggleMinimize = (windowName) => {
    setWindows(prev => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        minimized: !prev[windowName].minimized,
      }
    }));
  };

  const toggleFullscreen = (windowName) => {
    setWindows(prev => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        fullscreen: !prev[windowName].fullscreen,
      }
    }));
  };

  const bringToFront = (windowName) => {
    setWindows(prev => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        zIndex: Object.values(prev).reduce((max, w) => Math.max(max, w.zIndex), 0) + 1,
      }
    }));
    setActiveWindow(windowName);
  };

  // Projects data
  const projects = [
    {
      title: "Artifact Fetching For Dummies",
      description: "An FPS game with horror and parkour elements built with Unity.",
      image: "https://img.itch.zone/aW1nLzE4Nzk0Njg5LnBuZw==/original/FsHEyg.png",
      link: "https://gregrsea-975.itch.io/artifact-fetching-for-dummies",
    },
    {
      title: "JawaraDM Landing Page",
      description: "Modern responsive landing page built with React and Tailwind CSS.",
      image: "https://jawaradm.com/",
      link: "https://jawaradm.com/",
    },
    {
      title: "Starfall (WIP)",
      description: "Sci-fi roguelike shooter inspired by Risk of Rain 2 and No Mans Sky.",
      image: "https://via.placeholder.com/300x200?text=Starfall+Game",
      link: "#",
    },
  ];

  const games = [
    {
      title: "Minesweeper",
      description: "Classic Windows XP Minesweeper game",
      icon: faGamepad,
      action: () => openWindow("minesweeper"),
    },
    {
      title: "Snake",
      description: "Nostalgic Snake game from old mobile phones",
      icon: faGamepad,
      action: () => openWindow("snake"),
    },
    {
      title: "Target Practice",
      description: "Click the moving target to score points",
      icon: faGamepad,
      action: () => openWindow("games"),
    },
  ];

  return (
    <div className="windows-xp-bg">
      {/* Desktop Icons */}
      <div className="desktop-icons">
        <div className="desktop-icon" onClick={() => openWindow("profile")}>
          <FontAwesomeIcon icon={faUser} size="3x" />
          <span>My Profile</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("projects")}>
          <FontAwesomeIcon icon={faFolder} size="3x" />
          <span>Projects</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("games")}>
          <FontAwesomeIcon icon={faGamepad} size="3x" />
          <span>Games</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("spotify")}>
          <FontAwesomeIcon icon={faMusic} size="3x" />
          <span>Spotify</span>
        </div>
        <div className="desktop-icon" onClick={() => openWindow("aiChat")}>
          <FontAwesomeIcon icon={faRobot} size="3x" />
          <span>AI Assistant</span>
        </div>
      </div>

      {/* Profile Window */}
      {windows.profile.open && !windows.profile.minimized && (
        <div
          className={`window ${activeWindow === "profile" ? "active-window" : ""}`}
          style={{
            width: windows.profile.fullscreen ? "95vw" : "500px",
            height: windows.profile.fullscreen ? "90vh" : "auto",
            zIndex: windows.profile.zIndex,
          }}
          onClick={() => bringToFront("profile")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("profile")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("profile")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("profile")}>
                <FontAwesomeIcon icon={windows.profile.fullscreen ? faWindowRestore : faWindowMaximize} />
              </button>
            </div>
            <span>My Profile</span>
          </div>
          <div className="window-content">
            <div className="profile-content">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Profile" 
                className="profile-pic"
              />
              <div>
                <h2>Rafi Adnan</h2>
                <p>Full-stack developer | Game Developer | Creative Technologist</p>
                
                <div className="skills-section">
                  <h3>Technical Skills:</h3>
                  <ul>
                    <li><strong>Frontend:</strong> React, Next.js, Tailwind CSS, JavaScript</li>
                    <li><strong>Backend:</strong> Laravel, PHP, MySQL, Node.js</li>
                    <li><strong>Game Dev:</strong> Unity, C#, Shader Graph, NavMesh AI</li>
                    <li><strong>Tools:</strong> Git, Figma, Vercel, Netlify</li>
                  </ul>
                </div>

                <div className="bio-section">
                  <h3>About Me:</h3>
                  <p>
                    Im a passionate developer from Indonesia who builds immersive digital experiences. 
                    Whether its a sleek web application or an engaging game, I focus on creating 
                    intuitive, responsive, and memorable interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Window */}
      {windows.projects.open && !windows.projects.minimized && (
        <div
          className={`window ${activeWindow === "projects" ? "active-window" : ""}`}
          style={{
            width: windows.projects.fullscreen ? "95vw" : "600px",
            height: windows.projects.fullscreen ? "90vh" : "500px",
            zIndex: windows.projects.zIndex,
          }}
          onClick={() => bringToFront("projects")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("projects")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("projects")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("projects")}>
                <FontAwesomeIcon icon={windows.projects.fullscreen ? faWindowRestore : faWindowMaximize} />
              </button>
            </div>
            <span>Projects</span>
          </div>
          <div className="window-content">
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div key={index} className="project-card">
                  <div className="project-image-container">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <Link href={project.link} target="_blank" className="project-link">
                      View Project
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Games Library Window */}
      {windows.games.open && !windows.games.minimized && (
        <div
          className={`window ${activeWindow === "games" ? "active-window" : ""}`}
          style={{
            width: windows.games.fullscreen ? "95vw" : "500px",
            height: windows.games.fullscreen ? "90vh" : "400px",
            zIndex: windows.games.zIndex,
          }}
          onClick={() => bringToFront("games")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("games")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("games")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("games")}>
                <FontAwesomeIcon icon={windows.games.fullscreen ? faWindowRestore : faWindowMaximize} />
              </button>
            </div>
            <span>Games Library</span>
          </div>
          <div className="window-content">
            <div className="games-library">
              <h2>Windows XP Classic Games</h2>
              <div className="games-grid">
                {games.map((game, index) => (
                  <div key={index} className="game-card" onClick={game.action}>
                    <FontAwesomeIcon icon={game.icon} size="3x" />
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Target Practice Game Window */}
      {windows.games.open && !windows.games.minimized && (
        <div
          className={`window ${activeWindow === "games" ? "active-window" : ""}`}
          style={{
            width: windows.games.fullscreen ? "95vw" : "400px",
            height: windows.games.fullscreen ? "90vh" : "400px",
            zIndex: windows.games.zIndex,
          }}
          onClick={() => bringToFront("games")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("games")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("games")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("games")}>
                <FontAwesomeIcon icon={windows.games.fullscreen ? faWindowRestore : faWindowMaximize} />
              </button>
            </div>
            <span>Target Practice - Score: {gameScore}</span>
          </div>
          <div 
            className="window-content game-container"
            onClick={(e) => {
              if (e.target.classList.contains("game-target")) {
                setGameScore(prev => prev + 1);
                setGamePosition({
                  x: Math.random() * 80 + 10,
                  y: Math.random() * 80 + 10,
                });
              }
            }}
          >
            <div 
              className="game-target"
              style={{
                left: `${gamePosition.x}%`,
                top: `${gamePosition.y}%`,
              }}
            ></div>
            <div className="game-instructions">
              Click the target to score points!
            </div>
          </div>
        </div>
      )}

      {/* Minesweeper Game Window */}
      {windows.minesweeper.open && !windows.minesweeper.minimized && (
        <div
          className={`window ${activeWindow === "minesweeper" ? "active-window" : ""}`}
          style={{
            width: windows.minesweeper.fullscreen ? "95vw" : "500px",
            height: windows.minesweeper.fullscreen ? "90vh" : "500px",
            zIndex: windows.minesweeper.zIndex,
          }}
          onClick={() => bringToFront("minesweeper")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("minesweeper")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("minesweeper")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("minesweeper")}>
                <FontAwesomeIcon icon={windows.minesweeper.fullscreen ? faWindowRestore : faWindowMaximize} />
              </button>
            </div>
            <span>Minesweeper {gameWon ? "🎉 You Won!" : gameLost ? "💥 Game Over!" : ""}</span>
          </div>
          <div className="window-content">
            <div className="minesweeper-container">
              <div className="minesweeper-controls">
                <button onClick={initializeMinesweeper}>New Game</button>
                <span>Mines: 15</span>
              </div>
              <div className="minesweeper-grid">
                {minesweeperGrid.map((row, y) => (
                  <div key={y} className="minesweeper-row">
                    {row.map((cell, x) => (
                      <div
                        key={`${x}-${y}`}
                        className={`minesweeper-cell ${
                          revealedCells.includes(`${x},${y}`) ? "revealed" : ""
                        } ${
                          flaggedCells.includes(`${x},${y}`) ? "flagged" : ""
                        }`}
                        onClick={() => revealCell(x, y)}
                        onContextMenu={(e) => toggleFlag(x, y, e)}
                      >
                        {revealedCells.includes(`${x},${y}`) ? (
                          cell === "M" ? (
                            "💣"
                          ) : cell > 0 ? (
                            cell
                          ) : null
                        ) : flaggedCells.includes(`${x},${y}`) ? (
                          "🚩"
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {gameLost && (
                <div className="game-over-message">
                  <p>You hit a mine! Game over.</p>
                  <button onClick={initializeMinesweeper}>Play Again</button>
                </div>
              )}
              {gameWon && (
                <div className="game-won-message">
                  <p>Congratulations! You cleared all mines!</p>
                  <button onClick={initializeMinesweeper}>Play Again</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Snake Game Window */}
      {windows.snake.open && !windows.snake.minimized && (
        <div
          className={`window ${activeWindow === "snake" ? "active-window" : ""}`}
          style={{
            width: windows.snake.fullscreen ? "95vw" : "500px",
            height: windows.snake.fullscreen ? "90vh" : "500px",
            zIndex: windows.snake.zIndex,
          }}
          onClick={() => bringToFront("snake")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("snake")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("snake")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("snake")}>
                <FontAwesomeIcon icon={windows.snake.fullscreen ? faWindowRestore : faWindowMaximize} />
              </button>
            </div>
            <span>Snake - Score: {gameScore} {gameOver ? "💀 Game Over!" : ""}</span>
          </div>
          <div className="window-content">
            <div 
              className="snake-game-container"
              ref={gameAreaRef}
            >
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className={`snake-segment ${index === 0 ? "snake-head" : ""}`}
                  style={{
                    left: `${segment.x * 5}%`,
                    top: `${segment.y * 5}%`,
                  }}
                ></div>
              ))}
              <div
                className="snake-food"
                style={{
                  left: `${food.x * 5}%`,
                  top: `${food.y * 5}%`,
                }}
              ></div>
              {gameOver && (
                <div className="snake-game-over">
                  <h2>Game Over!</h2>
                  <p>Final Score: {gameScore}</p>
                  <button onClick={() => {
                    setSnake([{ x: 10, y: 10 }]);
                    setFood({ x: 5, y: 5 });
                    setDirection("RIGHT");
                    setGameOver(false);
                    setGameScore(0);
                  }}>
                    Play Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Window */}
      {windows.aiChat.open && !windows.aiChat.minimized && (
        <div
          className={`window ${activeWindow === "aiChat" ? "active-window" : ""}`}
          style={{
            width: windows.aiChat.fullscreen ? "95vw" : "400px",
            height: windows.aiChat.fullscreen ? "90vh" : "500px",
            zIndex: windows.aiChat.zIndex,
          }}
          onClick={() => bringToFront("aiChat")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("aiChat")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("aiChat")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("aiChat")}>
                <FontAwesomeIcon icon={windows.aiChat.fullscreen ? faWindowRestore : faWindowMaximize} />
              </button>
            </div>
            <span>AI Assistant</span>
          </div>
          <div className="window-content">
            <div className="ai-chat-container">
              <div className="ai-header">
                <FontAwesomeIcon icon={faRobot} size="2x" />
                <h3>Portfolio AI Assistant</h3>
              </div>
              <div className="ai-messages">
                {aiResponse && (
                  <div className="ai-message">
                    <p>{aiResponse}</p>
                  </div>
                )}
                {isThinking && (
                  <div className="ai-thinking">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleAiSubmit} className="ai-input-form">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Ask me about Rafis skills or projects..."
                />
                <button type="submit" disabled={isThinking}>
                  {isThinking ? "Thinking..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Spotify Window */}
      {windows.spotify.open && !windows.spotify.minimized && (
        <div
          className={`window ${activeWindow === "spotify" ? "active-window" : ""}`}
          style={{
            width: windows.spotify.fullscreen ? "95vw" : "400px",
            height: windows.spotify.fullscreen ? "90vh" : "500px",
            zIndex: windows.spotify.zIndex,
          }}
          onClick={() => bringToFront("spotify")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("spotify")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("spotify")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("spotify")}>
                <FontAwesomeIcon icon={windows.spotify.fullscreen ? faWindowRestore : faWindowMaximize} />
              </button>
            </div>
            <span>Spotify Player</span>
          </div>
          <div className="window-content">
            <iframe
              src="https://open.spotify.com/embed/playlist/4tI4bWB5cKvlVEAypIpnn8"
              width="100%"
              height="380"
              frameBorder="0"
              allow="encrypted-media"
              className="spotify-embed"
            ></iframe>
            <div className="spotify-info">
              <h3>Rafis Coding Playlist</h3>
              <p>A mix of electronic and ambient tracks for focused development sessions.</p>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="taskbar">
        <div className="start-button" onClick={() => openWindow("profile")}>
          <span>Start</span>
        </div>
        <div className="taskbar-items">
          {Object.entries(windows).map(([name, state]) => (
            state.open && (
              <div
                key={name}
                className={`taskbar-item ${activeWindow === name ? "active" : ""}`}
                onClick={() => {
                  if (state.minimized) {
                    toggleMinimize(name);
                  }
                  bringToFront(name);
                }}
              >
                <FontAwesomeIcon icon={
                  name === "profile" ? faUser :
                  name === "projects" ? faFolder :
                  name === "spotify" ? faMusic :
                  name === "games" || name === "minesweeper" || name === "snake" ? faGamepad :
                  name === "aiChat" ? faRobot : faGlobe
                } />
                <span>
                  {name === "minesweeper" ? "Minesweeper" :
                   name === "snake" ? "Snake" :
                   name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
              </div>
            )
          ))}
        </div>
        <div className="clock">
          {time.toLocaleTimeString([], { hour: 2-digit, minute: 2-digit })}
          <br />
          {time.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default PortXFolio;