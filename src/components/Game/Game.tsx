import { useEffect, useState } from "react";
import Board from "../Board/Board";
import "./Game.css";

export default function Game() {
  const [gameId, setGameId] = useState(1);

  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === "KeyI") {
        setGameId(gameId + 1);
      }
    };

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  });

  return (
    <>
      <section className="how-to-play">
        <h2>How to play</h2>
        <ol>
          <li>The game is played on a grid that's 3 squares by 3 squares.</li>
          <li>
            You are X and your friend is O. Players take turns putting their
            marks in empty squares, by clicking on them.
          </li>
          <li>
            The first player to get 3 of its marks in a row (up, down, across,
            or diagonally) is the winner.
          </li>
          <li>
            When all 9 squares are full, the game is over. If no player has 3
            marks in a row, the game ends in a tie.
          </li>
        </ol>
      </section>

      <details>
        <summary>Keyboard commands</summary>
        <ul>
          <li>
            Press the "ctrl" or "cmd" + "k" keys to focus the top left tile.
          </li>
          <li>
            Press the space bar to mark the tile with either an X or an O,
            depending on the current player to play.
          </li>
          <li>Use the arrow keys to change the focused tile.</li>
          <li>Press the "ctrl" or "cmd" + "i" keys to start a new game.</li>
        </ul>
      </details>

      <h2>Let's play!</h2>

      <p className="game-id">
        You are currently playing the game n° {gameId}.<br />
        <button type="button" onClick={() => setGameId(gameId + 1)}>
          Start a new game
        </button>
      </p>

      <Board key={gameId}></Board>
    </>
  );
}
