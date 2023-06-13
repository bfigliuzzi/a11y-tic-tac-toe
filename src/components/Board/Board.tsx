import { useEffect, useState } from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import { Position } from "../../types/position.enum";
import { calculateWinner } from "../../helpers/board.helper";
import { TileValue } from "../../types/tile-value.type";
import { getTextFromPosition } from "../../helpers/position-to-text.helper";
import { Player } from "../../types/player.type";

export default function Board() {
  const [tiles, setTiles] = useState(Array<TileValue>(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [btnWithFocus, setBtnWithFocus] = useState<Position | null>(null);

  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.code === "KeyK") {
        handleTileFocus(Position.TOP_LEFT);
        return;
      }

      console.log("coucoucouco", event.code, btnWithFocus);

      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
          event.code
        ) &&
        btnWithFocus != null
      ) {
        let index = btnWithFocus as number;

        switch (event.code) {
          case "ArrowUp":
            index -= 3;
            break;
          case "ArrowDown":
            index += 3;
            break;
          case "ArrowLeft":
            index -= 1;
            break;
          case "ArrowRight":
            index += 1;
            break;
        }

        if (index < 0) {
          index = 0;
        } else if (index > 8) {
          index = 8;
        }

        handleTileFocus(index);
        return;
      }
    };

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  });

  function handleTileClick(tileIndex: number) {
    if (tiles[tileIndex] != null || hasAWinner()) {
      return;
    }

    const tilesCopy = [...tiles];
    tilesCopy[tileIndex] = currentPlayer;
    setTiles(tilesCopy);

    changeCurrentPlayer();
  }

  function handleTileFocus(position?: Position) {
    if (position == null) {
      setAnnouncement(null);
      setBtnWithFocus(null);
      return;
    }

    setBtnWithFocus(position);

    setAnnouncement(
      `Add an ${currentPlayer} to the ${getTextFromPosition(position)} position`
    );
  }

  function changeCurrentPlayer() {
    if (currentPlayer === "X") {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }
  }

  function hasAWinner(): boolean {
    return calculateWinner(tiles) !== null;
  }

  function isGameOver() {
    return !hasAWinner() && tiles.every((val) => val);
  }

  function shouldButtonHasFocus(position: Position) {
    return btnWithFocus === position;
  }

  return (
    <>
      <section role="region" aria-live="assertive" className="board-state">
        {hasAWinner() && (
          <p>Congratulations player {calculateWinner(tiles)}! You won!</p>
        )}
        {!hasAWinner() && !isGameOver() && (
          <p>Current player to play: {currentPlayer}</p>
        )}
        {isGameOver() && (
          <p>
            Nobody wins sadly... Better luck next time!
            <br />
            Hit the "Start a new game" button to play again.
          </p>
        )}
        {announcement && <p className="sr-only">{announcement}</p>}
      </section>

      <section className="board">
        {tiles.map((tileValue, index) => (
          <Tile
            key={index}
            value={tileValue}
            ariaLabel={`${getTextFromPosition(index)} tile`}
            onTileClick={() => handleTileClick(index)}
            onTileFocus={() => handleTileFocus(index)}
            onTileBlur={() => handleTileFocus()}
            isTileDisabled={hasAWinner() || isGameOver()}
            hasFocus={shouldButtonHasFocus(index)}
          ></Tile>
        ))}
      </section>
    </>
  );
}
