let rowIndex = cage.row - 1;
let colIndex = cage.col - 1;

let topRow = rowIndex ? this.rows * (rowIndex - 1) : this.rows * (this.rows - 1)
let centerRow = this.rows * rowIndex
let bottomRow = rowIndex !== this.rows - 1 ? this.rows * (rowIndex + 1) : 0
let leftColumn = colIndex ? colIndex - 1 : this.columns - 1
let centerColumn = colIndex
let rightColumn = colIndex !== this.columns - 1 ? colIndex + 1 : 0

let leftTop = topRow + leftColumn;
let top = topRow + centerColumn;
let rightTop = topRow + rightColumn;
let left = centerRow + leftColumn;
let right = centerRow + rightColumn;
let leftBottom = bottomRow + leftColumn;
let bottom = bottomRow + centerColumn;
let rightBottom = bottomRow + rightColumn;