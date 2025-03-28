/**
 * Utility functions for grid generation and manipulation
 */

/**
 * Generates a grid with the specified number of columns and rows
 * @param {number} columns - Number of columns in the grid
 * @param {number} rows - Number of rows in the grid
 * @returns {Array} - 2D array representing the grid
 */
export const generateGrid = (columns, rows) => {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const rowCells = [];

    for (let col = 0; col < columns; col++) {
      rowCells.push({
        row,
        col,
        // Assign a random light color to each cell for visual distinction
        color: getRandomLightColor()
      });
    }

    grid.push(rowCells);
  }

  return grid;
};

/**
 * Generates a random light color for grid cells
 * @returns {string} - CSS color string
 */
const getRandomLightColor = () => {
  // Generate a light pastel color
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 25%, 90%)`;
};

/**
 * Checks if a point is on a border between cells
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} cellSize - Size of each cell
 * @returns {Object|null} - Border information or null if not on a border
 */
export const isOnBorder = (x, y, cellSize) => {
  const col = Math.floor(x / cellSize);
  const row = Math.floor(y / cellSize);

  const xOffset = x % cellSize;
  const yOffset = y % cellSize;

  const borderThreshold = 5; // 5px threshold for border detection

  // Check if on horizontal border
  if (yOffset <= borderThreshold || yOffset >= cellSize - borderThreshold) {
    return {
      type: 'horizontal',
      row: yOffset <= borderThreshold ? row : row + 1,
      col
    };
  }

  // Check if on vertical border
  if (xOffset <= borderThreshold || xOffset >= cellSize - borderThreshold) {
    return {
      type: 'vertical',
      row,
      col: xOffset <= borderThreshold ? col : col + 1
    };
  }

  return null;
};