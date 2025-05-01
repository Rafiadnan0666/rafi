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
  faRobot,
  faChess,
  faBorderAll,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./../page.css";
import Script from "next/script";
const PortXFolio = () => {
  // State hooks
  const [windows, setWindows] = useState({
    profile: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 1,
      pos: { x: 50, y: 50 },
    },
    projects: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 2,
      pos: { x: 100, y: 100 },
    },
    spotify: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 3,
      pos: { x: 150, y: 150 },
    },
    gamesLibrary: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 4,
      pos: { x: 200, y: 200 },
    },
    targetPractice: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 5,
      pos: { x: 220, y: 220 },
    },
    minesweeper: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 6,
      pos: { x: 250, y: 250 },
    },
    snake: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 7,
      pos: { x: 300, y: 300 },
    },
    tetris: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 8,
      pos: { x: 350, y: 350 },
    },
    chess: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 9,
      pos: { x: 400, y: 400 },
    },
    aiChat: {
      open: false,
      minimized: false,
      fullscreen: false,
      zIndex: 10,
      pos: { x: 450, y: 450 },
    },
  });

  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragWindow, setDragWindow] = useState(null);

  // Game states
  const [gameScore, setGameScore] = useState(0);
  const [gamePosition, setGamePosition] = useState({ x: 50, y: 50 });

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("RIGHT");
  const [snakeGameOver, setSnakeGameOver] = useState(false);

  const [minesweeperGrid, setMinesweeperGrid] = useState([]);
  const [revealedCells, setRevealedCells] = useState([]);
  const [flaggedCells, setFlaggedCells] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const [tetrisGrid, setTetrisGrid] = useState(
    Array(20)
      .fill()
      .map(() => Array(10).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState(null);
  const [tetrisScore, setTetrisScore] = useState(0);
  const [tetrisGameOver, setTetrisGameOver] = useState(false);

  const [chessBoard, setChessBoard] = useState([]);
  const [selectedChessPiece, setSelectedChessPiece] = useState(null);

  // AI Chat
  const [aiResponse, setAiResponse] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const initializeSnake = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection("RIGHT");
    setSnakeGameOver(false);
    setGameScore(0);
  };

  useEffect(() => {
    if (windows.snake.open && snake.length === 1 && snake[0].x === 10) {
      initializeSnake();
    }
    if (windows.tetris.open && tetrisGrid[0][0] === 0) {
      initializeTetris();
    }
    if (windows.minesweeper.open && minesweeperGrid.length === 0) {
      initializeMinesweeper();
    }
    if (windows.chess.open && chessBoard.length === 0) {
      initializeChess();
    }
  }, [windows]);

  // Snake game logic
  useEffect(() => {
    if (!windows.snake.open || snakeGameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
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

     
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          setSnakeGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (
          prevSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          )
        ) {
          setSnakeGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          setGameScore((prev) => prev + 10);
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
  }, [direction, snakeGameOver, food, windows.snake.open]);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Snake controls
      if (windows.snake.open && !snakeGameOver) {
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
      }

      // Tetris controls
      if (windows.tetris.open && !tetrisGameOver && currentPiece) {
        switch (e.key) {
          case "ArrowLeft":
            moveTetrisPiece(-1, 0);
            break;
          case "ArrowRight":
            moveTetrisPiece(1, 0);
            break;
          case "ArrowDown":
            moveTetrisPiece(0, 1);
            break;
          case "ArrowUp":
            rotateTetrisPiece();
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, snakeGameOver, currentPiece, tetrisGameOver, windows]);

  // Clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tetris game loop
  useEffect(() => {
    if (!windows.tetris.open || tetrisGameOver) return;

    const dropPiece = () => {
      moveTetrisPiece(0, 1);
    };

    const gameLoop = setInterval(dropPiece, 1000);
    return () => clearInterval(gameLoop);
  }, [windows.tetris.open, tetrisGameOver, currentPiece]);

  // Window dragging logic
  const handleMouseDown = (e, windowName) => {
    if (e.target.closest(".window-controls")) return;

    bringToFront(windowName);
    setIsDragging(true);
    setDragWindow(windowName);
    setDragOffset({
      x: e.clientX - windows[windowName].pos.x,
      y: e.clientY - windows[windowName].pos.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragWindow) return;

    setWindows((prev) => ({
      ...prev,
      [dragWindow]: {
        ...prev[dragWindow],
        pos: {
          x: e.clientX - dragOffset.x,
          y: Math.min(e.clientY - dragOffset.y, window.innerHeight - 100),
        },
      },
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragWindow(null);
  };

  // Window management functions
  const openWindow = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        open: true,
        minimized: false,
        zIndex:
          Object.values(prev).reduce((max, w) => Math.max(max, w.zIndex), 0) +
          1,
      },
    }));
    setActiveWindow(windowName);
  };

  const closeWindow = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        open: false,
      },
    }));
    if (activeWindow === windowName) setActiveWindow(null);
  };

  const toggleMinimize = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        minimized: !prev[windowName].minimized,
      },
    }));
  };

  const toggleFullscreen = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        fullscreen: !prev[windowName].fullscreen,
        pos: prev[windowName].fullscreen
          ? prev[windowName].pos
          : { x: 0, y: 0 },
      },
    }));
  };

  const bringToFront = (windowName) => {
    setWindows((prev) => ({
      ...prev,
      [windowName]: {
        ...prev[windowName],
        zIndex:
          Object.values(prev).reduce((max, w) => Math.max(max, w.zIndex), 0) +
          1,
      },
    }));
    setActiveWindow(windowName);
  };

  const initializeMinesweeper = () => {
    const grid = Array(10)
      .fill()
      .map(() => Array(10).fill(0));
    let mines = 15;


    while (mines > 0) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (grid[y][x] !== "M") {
        grid[y][x] = "M";
        mines--;
      }
    }

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

  const revealCell = (x, y) => {
    if (
      flaggedCells.includes(`${x},${y}`) ||
      revealedCells.includes(`${x},${y}`)
    )
      return;
    if (gameWon || gameLost) return;

    const newRevealed = [...revealedCells, `${x},${y}`];
    setRevealedCells(newRevealed);

    if (minesweeperGrid[y][x] === "M") {
      setGameLost(true);
      return;
    }


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

    let unrevealed = 0;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (
          minesweeperGrid[y][x] !== "M" &&
          !newRevealed.includes(`${x},${y}`)
        ) {
          unrevealed++;
        }
      }
    }
    if (unrevealed === 0) setGameWon(true);
  };

  const toggleFlag = (x, y, e) => {
    e.preventDefault();
    if (revealedCells.includes(`${x},${y}`)) return;

    if (flaggedCells.includes(`${x},${y}`)) {
      setFlaggedCells(flaggedCells.filter((cell) => cell !== `${x},${y}`));
    } else {
      setFlaggedCells([...flaggedCells, `${x},${y}`]);
    }
  };


  const initializeTetris = () => {
    const emptyGrid = Array(20)
      .fill()
      .map(() => Array(10).fill(0));
    setTetrisGrid(emptyGrid);
    setTetrisScore(0);
    setTetrisGameOver(false);
    spawnNewTetrisPiece();
  };

  const spawnNewTetrisPiece = () => {
    const pieces = [
      [[1, 1, 1, 1]], // I
      [
        [1, 1],
        [1, 1],
      ], 
      [
        [1, 1, 1],
        [0, 1, 0],
      ], 
      [
        [1, 1, 1],
        [1, 0, 0],
      ], 
      [
        [1, 1, 1],
        [0, 0, 1],
      ], 
      [
        [0, 1, 1],
        [1, 1, 0],
      ], 
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
    ];

    const newPiece = {
      shape: pieces[Math.floor(Math.random() * pieces.length)],
      pos: { x: 4, y: 0 },
    };

    setCurrentPiece(newPiece);
  };

  const moveTetrisPiece = (x, y) => {
    if (!currentPiece) return;

    const newX = currentPiece.pos.x + x;
    const newY = currentPiece.pos.y + y;

    if (isValidMove(currentPiece.shape, newX, newY)) {
      setCurrentPiece({
        ...currentPiece,
        pos: { x: newX, y: newY },
      });
    } else if (y > 0) {

      lockTetrisPiece();
    }
  };

  const rotateTetrisPiece = () => {
    if (!currentPiece) return;

    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map((row) => row[i]).reverse()
    );

    if (isValidMove(rotated, currentPiece.pos.x, currentPiece.pos.y)) {
      setCurrentPiece({
        ...currentPiece,
        shape: rotated,
      });
    }
  };

  const isValidMove = (shape, x, y) => {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const newX = x + col;
          const newY = y + row;

          if (
            newX < 0 ||
            newX >= 10 ||
            newY >= 20 ||
            (newY >= 0 && tetrisGrid[newY][newX] !== 0)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const lockTetrisPiece = () => {
    const newGrid = [...tetrisGrid];
    let gameOver = false;

    // Add piece to grid
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col] !== 0) {
          const y = currentPiece.pos.y + row;
          const x = currentPiece.pos.x + col;

          if (y < 0) {
            gameOver = true;
            break;
          }

          newGrid[y][x] = 1;
        }
      }
    }

    if (gameOver) {
      setTetrisGameOver(true);
      return;
    }

    // Check for completed lines
    const linesCleared = newGrid.reduce((count, row, y) => {
      if (row.every((cell) => cell !== 0)) {
        newGrid.splice(y, 1);
        newGrid.unshift(Array(10).fill(0));
        return count + 1;
      }
      return count;
    }, 0);

    setTetrisScore((prev) => prev + linesCleared * 100);
    setTetrisGrid(newGrid);
    spawnNewTetrisPiece();
  };


  const initializeChess = () => {
    const board = Array(8)
      .fill()
      .map(() => Array(8).fill(null));

    // Set up pawns
    for (let i = 0; i < 8; i++) {
      board[1][i] = { type: "pawn", color: "black" };
      board[6][i] = { type: "pawn", color: "white" };
    }

    const pieces = [
      "rook",
      "knight",
      "bishop",
      "queen",
      "king",
      "bishop",
      "knight",
      "rook",
    ];
    for (let i = 0; i < 8; i++) {
      board[0][i] = { type: pieces[i], color: "black" };
      board[7][i] = { type: pieces[i], color: "white" };
    }

    setChessBoard(board);
  };

  const handleChessClick = (row, col) => {
    if (!selectedChessPiece) {
      if (chessBoard[row][col]) {
        setSelectedChessPiece({ row, col });
      }
    } else {
      // Try to move
      const { row: fromRow, col: fromCol } = selectedChessPiece;
      const piece = chessBoard[fromRow][fromCol];

      const newBoard = [...chessBoard];
      newBoard[row][col] = piece;
      newBoard[fromRow][fromCol] = null;

      setChessBoard(newBoard);
      setSelectedChessPiece(null);
    }
  };


  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setIsThinking(true);


    setTimeout(() => {
      const responses = [
        "I'm an AI assistant in this Windows XP portfolio. How can I help you?",
        "Rafi is a full-stack developer with expertise in React, Laravel, and Unity.",
        "Check out the Games section for some nostalgic Windows XP-style games!",
        "This portfolio showcases innovative web technologies and interactive elements.",
        "The Minesweeper and Snake games are fully functional. Try them out!",
        "Rafi is currently working on a sci-fi roguelike shooter called Starfall.",
      ];
      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsThinking(false);
      setUserMessage("");
    }, 1500);
  };

  // Target game
  const hitTarget = () => {
    setGameScore((prev) => prev + 1);
    setGamePosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    });
  };

  // Projects data
  const projects = [
    {
      title: "Artifact Fetching For Dummies",
      description:
        "An FPS game with horror and parkour elements built with Unity.",
      image:
        "https://img.itch.zone/aW1nLzE4Nzk0Njg5LnBuZw==/original/FsHEyg.png",
      link: "https://gregrsea-975.itch.io/artifact-fetching-for-dummies",
    },
    {
      title: "JawaraDM Landing Page",
      description:
        "Modern responsive landing page built with React and Tailwind CSS.",
      image: "https://placehold.co/600x400/EEE/31343C",
      link: "https://jawaradm.com/",
    },
    {
      title: "Starfall (Coming Soon)",
      description:
        "Sci-fi roguelike shooter inspired by Risk of Rain 2 and No Man's Sky.",
      image: "https://via.placeholder.com/300x200?text=Starfall+Game",
      link: "#",
    },
    {
      title: "End",
      description:
        "A sinister coliseum where warriors fight for false freedom.",
      image:
        "https://img.itch.zone/aW1nLzE5NjM4NTM0LmpwZw==/315x250%23c/YRDn7Q.jpg",
      link: "https://gregrsea-975.itch.io/end",
    },
    {
      title: "Currency Converter",
      description:
        "A web that you can convert any currency",
      image:
        "https://img.itch.zone/aW1nLzE5NjM4NTM0LmpwZw==/315x250%23c/YRDn7Q.jpg",
      link: "https://rafiadnan.my.id/converter",
    },
    {
      title: "Url To Qr Converter",
      description:
        "A web that you can convert any Url To Qr",
      image:
        "https://placehold.co/600x400/EEE/31343C",
      link: "https://gregrsea-975.itch.io/end",
    },
    {
      title: "Weather",
      description:
        "A web that you can see how it's the weather",
      image:
        "https://placehold.co/600x400/EEE/31343C",
      link: "https://gregrsea-975.itch.io/end",
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
      title: "Tetris",
      description: "Classic block-stacking game",
      icon: faBorderAll,
      action: () => openWindow("tetris"),
    },
    {
      title: "Chess",
      description: "Traditional chess game",
      icon: faChess,
      action: () => openWindow("chess"),
    },
    {
      title: "Target Practice",
      description: "Click the moving target to score points",
      icon: faGamepad,
      action: () => openWindow("targetPractice"),
    },
  ];

  return (
    <div
      className="windows-xp-bg"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
        <div
          className="desktop-icon"
          onClick={() => openWindow("gamesLibrary")}
        >
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
    className={`window ${
      activeWindow === "profile" ? "active-window" : ""
    }`}
    style={{
      width: windows.profile.fullscreen ? "95vw" : "500px",
      height: windows.profile.fullscreen ? "90vh" : "auto",
      zIndex: windows.profile.zIndex,
      left: windows.profile.fullscreen ? 0 : windows.profile.pos.x,
      top: windows.profile.fullscreen ? 0 : windows.profile.pos.y,
    }}
    onMouseDown={(e) => handleMouseDown(e, "profile")}
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
          <FontAwesomeIcon
            icon={
              windows.profile.fullscreen
                ? faWindowRestore
                : faWindowMaximize
            }
          />
        </button>
      </div>
      <span>My Profile</span>
    </div>
    <div className="window-content">
      <div className="profile-content">
        <img
          src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5807b862bf1790ac6b1f82ab75d1be73-1743593947676/af264c2c-8fbc-4003-a5b3-d0b46292c8f8.png"
          alt="Profile"
          className="profile-pic"
        />
        <div>
          <h2>Rafi Adnan</h2>
          <p>
            Full-stack Developer | Game Developer | Creative Technologist
          </p>

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
              I m a passionate and versatile developer based in Indonesia,
              dedicated to building immersive digital experiences across web
              and game development. My skillset bridges frontend and backend
              systems, real-time interaction, and creative design. Whether
              it s a sleek full-stack application or a high-energy multiplayer
              game in Unity, I bring ideas to life with clean code, smart logic,
              and memorable user experiences. I love challenges and I thrive in
              both solo and collaborative environments.
            </p>
          </div>

          <div className="kofi-section" style={{ marginTop: "20px" }}>
            <a
              href="https://ko-fi.com/Q5Q81DS5SA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                height="36"
                style={{ border: 0, height: 36 }}
                src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
                alt="Buy Me a Coffee at ko-fi.com"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


      {/* Projects Window */}
      {windows.projects.open && !windows.projects.minimized && (
        <div
          className={`window ${
            activeWindow === "projects" ? "active-window" : ""
          }`}
          style={{
            width: windows.projects.fullscreen ? "95vw" : "600px",
            height: windows.projects.fullscreen ? "90vh" : "500px",
            zIndex: windows.projects.zIndex,
            left: windows.projects.fullscreen ? 0 : windows.projects.pos.x,
            top: windows.projects.fullscreen ? 0 : windows.projects.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "projects")}
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
                <FontAwesomeIcon
                  icon={
                    windows.projects.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
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
                    <Link
                      href={project.link}
                      target="_blank"
                      className="project-link"
                    >
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
      {windows.gamesLibrary.open && !windows.gamesLibrary.minimized && (
        <div
          className={`window ${
            activeWindow === "gamesLibrary" ? "active-window" : ""
          }`}
          style={{
            width: windows.gamesLibrary.fullscreen ? "95vw" : "500px",
            height: windows.gamesLibrary.fullscreen ? "90vh" : "400px",
            zIndex: windows.gamesLibrary.zIndex,
            left: windows.gamesLibrary.fullscreen
              ? 0
              : windows.gamesLibrary.pos.x,
            top: windows.gamesLibrary.fullscreen
              ? 0
              : windows.gamesLibrary.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "gamesLibrary")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("gamesLibrary")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("gamesLibrary")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("gamesLibrary")}>
                <FontAwesomeIcon
                  icon={
                    windows.gamesLibrary.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
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
      {windows.targetPractice.open && !windows.targetPractice.minimized && (
        <div
          className={`window ${
            activeWindow === "targetPractice" ? "active-window" : ""
          }`}
          style={{
            width: windows.targetPractice.fullscreen ? "95vw" : "400px",
            height: windows.targetPractice.fullscreen ? "90vh" : "400px",
            zIndex: windows.targetPractice.zIndex,
            left: windows.targetPractice.fullscreen
              ? 0
              : windows.targetPractice.pos.x,
            top: windows.targetPractice.fullscreen
              ? 0
              : windows.targetPractice.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "targetPractice")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("targetPractice")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("targetPractice")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("targetPractice")}>
                <FontAwesomeIcon
                  icon={
                    windows.targetPractice.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>Target Practice - Score: {gameScore}</span>
          </div>
          <div className="window-content game-container" onClick={hitTarget}>
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
          className={`window ${
            activeWindow === "minesweeper" ? "active-window" : ""
          }`}
          style={{
            width: windows.minesweeper.fullscreen ? "95vw" : "500px",
            height: windows.minesweeper.fullscreen ? "90vh" : "500px",
            zIndex: windows.minesweeper.zIndex,
            left: windows.minesweeper.fullscreen
              ? 0
              : windows.minesweeper.pos.x,
            top: windows.minesweeper.fullscreen ? 0 : windows.minesweeper.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "minesweeper")}
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
                <FontAwesomeIcon
                  icon={
                    windows.minesweeper.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>
              Minesweeper{" "}
              {gameWon ? "🎉 You Won!" : gameLost ? "💥 Game Over!" : ""}
            </span>
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
                        {revealedCells.includes(`${x},${y}`)
                          ? cell === "M"
                            ? "💣"
                            : cell > 0
                            ? cell
                            : null
                          : flaggedCells.includes(`${x},${y}`)
                          ? "🚩"
                          : null}
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
          className={`window ${
            activeWindow === "snake" ? "active-window" : ""
          }`}
          style={{
            width: windows.snake.fullscreen ? "95vw" : "500px",
            height: windows.snake.fullscreen ? "90vh" : "500px",
            zIndex: windows.snake.zIndex,
            left: windows.snake.fullscreen ? 0 : windows.snake.pos.x,
            top: windows.snake.fullscreen ? 0 : windows.snake.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "snake")}
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
                <FontAwesomeIcon
                  icon={
                    windows.snake.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>
              Snake - Score: {gameScore} {snakeGameOver ? "💀 Game Over!" : ""}
            </span>
          </div>
          <div className="window-content">
            <div className="snake-game-container">
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
              {snakeGameOver && (
                <div className="snake-game-over">
                  <h2>Game Over!</h2>
                  <p>Final Score: {gameScore}</p>
                  <button onClick={initializeSnake}>Play Again</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tetris Game Window */}
      {windows.tetris.open && !windows.tetris.minimized && (
        <div
          className={`window ${
            activeWindow === "tetris" ? "active-window" : ""
          }`}
          style={{
            width: windows.tetris.fullscreen ? "95vw" : "400px",
            height: windows.tetris.fullscreen ? "90vh" : "600px",
            zIndex: windows.tetris.zIndex,
            left: windows.tetris.fullscreen ? 0 : windows.tetris.pos.x,
            top: windows.tetris.fullscreen ? 0 : windows.tetris.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "tetris")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("tetris")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("tetris")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("tetris")}>
                <FontAwesomeIcon
                  icon={
                    windows.tetris.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>
              Tetris - Score: {tetrisScore}{" "}
              {tetrisGameOver ? "💀 Game Over!" : ""}
            </span>
          </div>
          <div className="window-content">
            <div className="tetris-container">
              <div className="tetris-grid">
                {tetrisGrid.map((row, y) => (
                  <div key={y} className="tetris-row">
                    {row.map((cell, x) => {
                      // Current piece cells
                      let isCurrentPiece = false;
                      if (currentPiece) {
                        for (let py = 0; py < currentPiece.shape.length; py++) {
                          for (
                            let px = 0;
                            px < currentPiece.shape[py].length;
                            px++
                          ) {
                            if (
                              currentPiece.shape[py][px] !== 0 &&
                              y === currentPiece.pos.y + py &&
                              x === currentPiece.pos.x + px
                            ) {
                              isCurrentPiece = true;
                            }
                          }
                        }
                      }

                      return (
                        <div
                          key={x}
                          className={`tetris-cell ${
                            cell !== 0 || isCurrentPiece ? "filled" : ""
                          }`}
                        ></div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="tetris-controls">
                <p>Controls: Arrow keys to move, Up to rotate</p>
                {tetrisGameOver && (
                  <button onClick={initializeTetris}>Play Again</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {windows.chess.open && !windows.chess.minimized && (
        <div
          className={`window ${
            activeWindow === "chess" ? "active-window" : ""
          }`}
          style={{
            width: windows.chess.fullscreen ? "95vw" : "500px",
            height: windows.chess.fullscreen ? "90vh" : "500px",
            zIndex: windows.chess.zIndex,
            left: windows.chess.fullscreen ? 0 : windows.chess.pos.x,
            top: windows.chess.fullscreen ? 0 : windows.chess.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "chess")}
        >
          <div className="window-title-bar">
            <div className="window-controls">
              <button onClick={() => closeWindow("chess")}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button onClick={() => toggleMinimize("chess")}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button onClick={() => toggleFullscreen("chess")}>
                <FontAwesomeIcon
                  icon={
                    windows.chess.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
              </button>
            </div>
            <span>Chess</span>
          </div>
          <div className="window-content">
            <div className="chess-container">
              <div className="chess-board">
                {chessBoard.map((row, y) => (
                  <div key={y} className="chess-row">
                    {row.map((piece, x) => (
                      <div
                        key={x}
                        className={`chess-cell ${
                          (x + y) % 2 === 0 ? "light" : "dark"
                        } ${
                          selectedChessPiece?.row === y &&
                          selectedChessPiece?.col === x
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleChessClick(y, x)}
                      >
                        {piece && (
                          <span className={`chess-piece ${piece.color}`}>
                            {getChessSymbol(piece.type, piece.color)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="chess-controls">
                <button onClick={initializeChess}>New Game</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Window */}
      {windows.aiChat.open && !windows.aiChat.minimized && (
        <div
          className={`window ${
            activeWindow === "aiChat" ? "active-window" : ""
          }`}
          style={{
            width: windows.aiChat.fullscreen ? "95vw" : "400px",
            height: windows.aiChat.fullscreen ? "90vh" : "500px",
            zIndex: windows.aiChat.zIndex,
            left: windows.aiChat.fullscreen ? 0 : windows.aiChat.pos.x,
            top: windows.aiChat.fullscreen ? 0 : windows.aiChat.pos.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, "aiChat")}
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
                <FontAwesomeIcon
                  icon={
                    windows.aiChat.fullscreen
                      ? faWindowRestore
                      : faWindowMaximize
                  }
                />
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
    className={`window ${
      activeWindow === "spotify" ? "active-window" : ""
    }`}
    style={{
      width: windows.spotify.fullscreen ? "95vw" : "400px",
      height: windows.spotify.fullscreen ? "90vh" : "500px",
      zIndex: windows.spotify.zIndex,
      left: windows.spotify.fullscreen ? 0 : windows.spotify.pos.x,
      top: windows.spotify.fullscreen ? 0 : windows.spotify.pos.y,
    }}
    onMouseDown={(e) => handleMouseDown(e, "spotify")}
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
          <FontAwesomeIcon
            icon={
              windows.spotify.fullscreen
                ? faWindowRestore
                : faWindowMaximize
            }
          />
        </button>
      </div>
      <span>My Music</span>
    </div>
    <div className="window-content">
      <iframe
        src="https://open.spotify.com/embed/artist/2PYunjmmYVDbsSudTPSwyv?utm_source=generator"
        width="100%"
        height="380"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="spotify-embed"
      ></iframe>
      <div className="spotify-info">
        <h3>Rafi Adnan on Spotify</h3>
        <p>
      
        </p>
      </div>
    </div>
  </div>
)}


      {/* Taskbar */}
      <div className="taskbar">
        <div
          className="start-button"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
        >
          <span>Start</span>
        </div>
        {startMenuOpen && (
          <div className="start-menu active">
            <div className="start-header">
              <img
                src="https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5807b862bf1790ac6b1f82ab75d1be73-1743593947676/af264c2c-8fbc-4003-a5b3-d0b46292c8f8.png"
                alt="Profile"
                className="start-profile-pic"
              />
              <div>
                <div className="start-name">Rafi Adnan</div>
                <div className="start-skills">
                  Full-Stack Developer | Game Designer
                </div>
              </div>
            </div>
            <div className="start-menu-items">
              <div
                className="start-menu-item"
                onClick={() => {
                  openWindow("profile");
                  setStartMenuOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>My Profile</span>
              </div>
              <div
                className="start-menu-item"
                onClick={() => {
                  openWindow("projects");
                  setStartMenuOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faFolder} />
                <span>Projects</span>
              </div>
              <div
                className="start-menu-item"
                onClick={() => {
                  openWindow("gamesLibrary");
                  setStartMenuOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faGamepad} />
                <span>Games</span>
              </div>
              <div
                className="start-menu-item"
                onClick={() => {
                  openWindow("spotify");
                  setStartMenuOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faMusic} />
                <span>Spotify</span>
              </div>
              <div
                className="start-menu-item"
                onClick={() => {
                  openWindow("aiChat");
                  setStartMenuOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faRobot} />
                <span>AI Assistant</span>
              </div>
            </div>
          </div>
        )}
        <div className="taskbar-items">
          {Object.entries(windows).map(
            ([name, state]) =>
              state.open && (
                <div
                  key={name}
                  className={`taskbar-item ${
                    activeWindow === name ? "active" : ""
                  }`}
                  onClick={() => {
                    if (state.minimized) {
                      toggleMinimize(name);
                    }
                    bringToFront(name);
                  }}
                >
                  <FontAwesomeIcon
                    icon={
                      name === "profile"
                        ? faUser
                        : name === "projects"
                        ? faFolder
                        : name === "spotify"
                        ? faMusic
                        : name === "gamesLibrary" ||
                          name === "minesweeper" ||
                          name === "snake" ||
                          name === "tetris" ||
                          name === "targetPractice"
                        ? faGamepad
                        : name === "chess"
                        ? faChess
                        : name === "aiChat"
                        ? faRobot
                        : faGlobe
                    }
                  />
                  <span>
                    {name === "minesweeper"
                      ? "Minesweeper"
                      : name === "snake"
                      ? "Snake"
                      : name === "tetris"
                      ? "Tetris"
                      : name === "chess"
                      ? "Chess"
                      : name === "targetPractice"
                      ? "Target Practice"
                      : name === "gamesLibrary"
                      ? "Games"
                      : name.charAt(0).toUpperCase() + name.slice(1)}
                  </span>
                </div>
              )
          )}
        </div>
        <div className="clock">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          <br />
          {time.toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  // Helper function for chess symbols
  function getChessSymbol(type, color) {
    const symbols = {
      king: color === "white" ? "♔" : "♚",
      queen: color === "white" ? "♕" : "♛",
      rook: color === "white" ? "♖" : "♜",
      bishop: color === "white" ? "♗" : "♝",
      knight: color === "white" ? "♘" : "♞",
      pawn: color === "white" ? "♙" : "♟",
    };
    return symbols[type];
  }
};

export default PortXFolio;
