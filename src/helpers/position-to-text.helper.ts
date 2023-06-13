import { Position } from "../types/position.enum";

export const textFromPosition: Record<Position, string> = {
  [Position.TOP_LEFT]: "top left",
  [Position.TOP_CENTER]: "top center",
  [Position.TOP_RIGHT]: "top right",
  [Position.MIDDLE_LEFT]: "middle left",
  [Position.MIDDLE_CENTER]: "middle center",
  [Position.MIDDLE_RIGHT]: "middle right",
  [Position.BOTTOM_LEFT]: "bottom left",
  [Position.BOTTOM_CENTER]: "bottom center",
  [Position.BOTTOM_RIGHT]: "bottom right",
};

export function getTextFromPosition(value: Position): string {
  return textFromPosition[value];
}
