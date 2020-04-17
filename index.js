const canvas = document.getElementById("canvas");
console.log(canvas);
const ctx = canvas.getContext("2d");
const CELL_WIDTH = 10;
let i = 0;
const initData = [
  [4, 6],
  [4, 5],
  [4, 4],
];
const initData1 = [
  [2, 2],
  [3, 3],
  [3, 4],
  [4, 2],
  [4, 3],
];
function Cell(x, y) {
  let o = {
    live: false,
    x,
    y,
    next: null, // 未来状态
  };
  o.draw = function () {
    if (o.live) {
      ctx.fillRect(o.x, o.y, 10, 10);
    } else {
      ctx.clearRect(o.x, o.y, 10, 10);
    }
  };
  o.change = () => {
    o.live = o.next;
    o.next = null;
  };
  return o;
}
function Main() {
  let o = {
    cells: [],
  };
  o.init = (data) => {
    for (let x = 0; x < 101; x++) {
      for (let y = 0; y < 101; y++) {
        let cell = new Cell(x * 10, y * 10);
        data.forEach((item) => {
          if (item[0] === x && item[1] === y) {
            cell.live = true;
          }
        });
        if (!o.cells[x]) o.cells[x] = [];
        o.cells[x][y] = cell;
      }
    }
    o.draw()
  };
  o.draw = () => {
    o.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.draw();
      });
    });
    o.next();
  };
  o.next = () => {
    let neighbor, neighborNum, x, y;
    o.cells.forEach((row) => {
      row.forEach((cell) => {
        neighborNum = 0;
        x = cell.x / 10;
        y = cell.y / 10;
        for (let i = x - 1; i <= x + 1; i++) {
          for (let l = y - 1; l <= y + 1; l++) {
            neighbor = o.cells[i] && o.cells[i][l];

            if (neighbor && neighbor.live&&(i!==x||y!==l)) {
              neighborNum++;
            }
          }
        }
        // if (neighborNum) console.log(neighborNum,[cell.x,cell.y]);
        if (cell.live) {
          if (neighborNum > 3 || neighborNum < 2) {
            cell.next = false;
          }else{
            cell.next = true
          }
        } else {
          if (neighborNum === 3) {
            cell.next = true;
          }else{
            cell.next = false
          }
        }
      });
    });
    o.cells.forEach((row) => row.forEach((cell) => cell.change()));
  };
  return o;
}

function draw() {
  ctx.clearRect(0, 0, 500, 500);
  main.draw();
}
let main;

function start(){

  setInterval(() => {
  ctx.clearRect(0, 0, 500, 500);
  window.requestAnimationFrame(function () {
    main.draw();
  });
  }, 1000 / 5);
}
window.onload = () => {
  main = new Main();
  main.init(initData1);
};
