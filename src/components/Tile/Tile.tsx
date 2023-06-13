import "./Tile.css";
import { TileValue } from "../../types/tile-value.type";
import { useEffect, useRef } from "react";

export interface TileInput {
  value: TileValue;
  onTileClick: () => void;
  onTileFocus: () => void;
  onTileBlur: () => void;
  ariaLabel: string;
  isTileDisabled: boolean;
  hasFocus: boolean;
}

export default function Tile({
  value,
  onTileClick,
  onTileFocus,
  onTileBlur,
  ariaLabel,
  isTileDisabled,
  hasFocus,
}: TileInput) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (hasFocus) {
      btnRef.current?.focus();
    }
  }, [hasFocus]);

  function getAriaLabel(): string {
    if (value) {
      return `${ariaLabel}: ${value}`;
    }

    return ariaLabel;
  }

  return (
    <button
      ref={btnRef}
      type="button"
      className="tile"
      onClick={onTileClick}
      onFocus={onTileFocus}
      onBlur={onTileBlur}
      aria-label={getAriaLabel()}
      disabled={isTileDisabled}
    >
      {value && value}
    </button>
  );
}
