import * as React from "react";
import "./App.css";
import Block from "./components/Block.tsx";
import Modal from "./components/Modal.tsx";

function App() {
  // Game state
  const [state, setState] = React.useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = React.useState("X");

  // Player selection and game flow
  const [playerOneSymbol, setPlayerOneSymbol] = React.useState<"X" | "O" | null>(null);
  const [playerTwoSymbol, setPlayerTwoSymbol] = React.useState<"X" | "O" | null>(null);
  const [winner, setWinner] = React.useState<string | null>(null);
  const [showPlayerChoice, setShowPlayerChoice] = React.useState(true);
  const [showWinnerModal, setShowWinnerModal] = React.useState(false);

  const checkWinner = () => {
    const winPossibilities = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const [a, b, c] of winPossibilities) {
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        const winner = state[a];
        // Determine which player won
        if (winner === playerOneSymbol) {
          return "Player 1";
        } else if (winner === playerTwoSymbol) {
          return "Player 2";
        }
        return winner;
      }
    }
    return null;
  };

  const isBoardFull = () => state.every((cell) => cell !== null);

  // Handle player choice
  const handlePlayerChoice = (symbol: "X" | "O") => {
    const other = symbol === "X" ? "O" : "X";
    setPlayerOneSymbol(symbol);
    setPlayerTwoSymbol(other);
    setCurrentTurn(symbol);
    setShowPlayerChoice(false);
  };

  // Handle reset for new game
  const handleNewGame = () => {
    setState(Array(9).fill(null));
    setWinner(null);
    setShowWinnerModal(false);
    setShowPlayerChoice(true);
    setPlayerOneSymbol(null);
    setPlayerTwoSymbol(null);
    setCurrentTurn("X");
  };

  const handleBlockClick = (index: number) => {
    // Prevent clicking if already occupied or game is won
    if (state[index]) return;
    if (winner) return;

    const newState = [...state];
    newState[index] = currentTurn;
    setState(newState);

    // Check for winner after this move
    const nextTurn = currentTurn === playerOneSymbol ? playerTwoSymbol : playerOneSymbol;
    setCurrentTurn(nextTurn!);
  };

  React.useEffect(() => {
    if (!playerOneSymbol || !playerTwoSymbol) return;

    const result = checkWinner();
    if (result) {
      setWinner(result);
      setShowWinnerModal(true);
    } else if (isBoardFull()) {
      setWinner("Draw");
      setShowWinnerModal(true);
    }
  }, [state]);

  return (
    <>
      {/* Player Choice Modal */}
      <Modal
        isOpen={showPlayerChoice}
        title="Choose Your Symbol"
        message="Player 1, select X or O"
        buttons={[
          {
            label: "X",
            onClick: () => handlePlayerChoice("X"),
            variant: "primary",
          },
          {
            label: "O",
            onClick: () => handlePlayerChoice("O"),
            variant: "primary",
          },
        ]}
      />

      {/* Winner Modal */}
      <Modal
        isOpen={showWinnerModal}
        title={winner === "Draw" ? "It's a Draw!" : "Game Over!"}
        message={
          winner === "Draw"
            ? "No more moves available. It's a draw!"
            : `${winner} wins! Congratulations!`
        }
        buttons={[
          {
            label: "Play Again",
            onClick: handleNewGame,
            variant: "primary",
          },
        ]}
      />

      {/* Game Container */}
      {playerOneSymbol && playerTwoSymbol && (
        <div className="game-shell">
          <div className="game-card">
            {/* Header */}
            <div className="game-header">
              <p className="game-kicker">Tic Tac Toe</p>
              <h1>Match</h1>
              <p className="game-subtitle">
                Two players, nine squares, ultimate strategy.
              </p>
            </div>

            {/* Player Tabs */}
            <div className="player-tabs">
              <div
                className={`player-tab ${currentTurn === playerOneSymbol ? "active" : ""}`}
              >
                <span className="player-symbol">{playerOneSymbol}</span>
                <span className="player-label">Player 1</span>
              </div>
              <div
                className={`player-tab ${currentTurn === playerTwoSymbol ? "active" : ""}`}
              >
                <span className="player-symbol">{playerTwoSymbol}</span>
                <span className="player-label">Player 2</span>
              </div>
            </div>

            {/* Board */}
            <div className="board">
              {[0, 1, 2].map((rowStart) => (
                <div key={rowStart} className="row">
                  {[0, 1, 2].map((col) => {
                    const index = rowStart * 3 + col;
                    return (
                      <Block
                        key={index}
                        onClick={() => handleBlockClick(index)}
                        value={state[index]}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* New Game Button */}
            <div className="game-actions">
              <button className="btn-new-game" onClick={handleNewGame}>
                New Game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
