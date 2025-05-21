document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
  

    if (startBtn && player1Input && player2Input) {
      startBtn.addEventListener("click", () => {
        const player1 = player1Input.value.trim();
        const player2 = player2Input.value.trim();
  
        if (!player1 || !player2) {
          alert("Please enter both player names.");
          return;
        }
  
        localStorage.setItem("player1", player1);
        localStorage.setItem("player2", player2);
        window.location.href = "Midterm.html";
      });
      return;
    }
  

    const canvas = document.getElementById("boxbattleCanvas");
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    const resetBtn = document.querySelector("#reset-btn");
    const newGameButton = document.querySelector("#new-btn");
    const pauseBtn = document.querySelector("#pause-btn");
    const msgContainer = document.querySelector(".msg-container");
    const msg = document.querySelector("#msg");
    const container = document.querySelector(".container");
  
    const name1El = document.getElementById("name1");
    const name2El = document.getElementById("name2");
    const currentTurnText = document.getElementById("current-turn");
  
    let player1 = localStorage.getItem("player1") || "Player 1";
    let player2 = localStorage.getItem("player2") || "Player 2";
  
    if (name1El) name1El.textContent = player1;
    if (name2El) name2El.textContent = player2;
  
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "O";
    let gameOver = false;
    let isPaused = false;
  
    const gridSize = 3;
    const cellSize = canvas.width / gridSize;
  
    const updateTurnText = () => {
      const name = currentPlayer === "O" ? player1 : player2;
      if (currentTurnText) {
        currentTurnText.textContent = `Turn: ${name}`;
      }
    };
  
    const drawGrid = () => {

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 4;
  
      for (let i = 1; i < gridSize; i++) {
      
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
  

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
      }
    };
  
    const drawMove = (index, player) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const x = col * cellSize + cellSize / 2;
      const y = row * cellSize + cellSize / 2;
  
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#080808"; 
      ctx.fillText(player, x, y);
    };
  
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    };
  
    const handleClick = (event) => {
      if (gameOver || isPaused) return;
  
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
      const index = row * gridSize + col;
  
      if (board[index]) return;
  
      board[index] = currentPlayer;
      drawMove(index, currentPlayer);
  
      const winner = checkWinner();
      if (winner) {
        const winnerName = winner === "O" ? player1 : player2;
        msg.innerText = `Congratulations ${winnerName}, You won!`;
        msgContainer.classList.remove("hide");
        container.classList.add("hide");
        gameOver = true;
      } else if (board.every(cell => cell !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        container.classList.add("hide");
        gameOver = true;
      }
  
      currentPlayer = currentPlayer === "O" ? "X" : "O";
      updateTurnText();
    };
  
    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "O";
        gameOver = false;
        isPaused = false;
        pauseBtn.innerText = "Pause Game";
      
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();                                      
        updateTurnText();                          
      
        msgContainer.classList.add("hide");             
        container.classList.remove("hide");               
      };
    const togglePause = () => {
      isPaused = !isPaused;
      pauseBtn.innerText = isPaused ? "Resume Game" : "Pause Game";
    };
  
    drawGrid();
    updateTurnText();
  
    canvas.addEventListener("click", handleClick);

    newGameButton.addEventListener("click", () => {
        localStorage.removeItem("player1");
        localStorage.removeItem("player2");
        window.location.href = "front_page.html";
      });

    resetBtn.addEventListener("click", resetGame);
    pauseBtn.addEventListener("click", togglePause);
    
    window.addEventListener("keydown", (e) => {
        if (e.key === "p" || e.key === "P") togglePause();
        if (e.key === "r" || e.key === "R") resetGame();
      });
  });
  