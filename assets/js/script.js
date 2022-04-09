const button = document.querySelector("#btn");
const result_div = document.querySelector(".result");

const draw_div = document.querySelector(".draw");
const p1_div = document.querySelector(".p1");
const p2_div = document.querySelector(".p2");

let streak = [];
let draws, player_one_wins, player_two_wins;

const winPostions = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [3, 4, 5],
];

const game = document.querySelector(".game");
const tiles = document.querySelectorAll(".tile");
const p1_name = document.querySelector("#p1");
const p2_name = document.querySelector("#p2");
// x => 1
// o => 0
let player_one = "P1"; // prompt("Please enter player one name")

let player_two = "P2"; //prompt("Please enter player two name")

let value = true;

game.x = player_one;
game.o = player_two;

result_div.innerText = value === true ? game.x + "'s turn" : game.o + "'s turn";

function opt(ele) {
  const current = ele.getAttribute("data-set");
  if (current === null) {
    ele.setAttribute("data-set", "true");
    if (value) {
      ele.innerHTML = `<span class="material-icons-outlined xl">
    close
    </span>`;
      ele.setAttribute("data-val", "1");
      result_div.innerText = game.o + "'s  turn";
    } else {
      ele.innerHTML = `
    <span class="material-icons-outlined xl">
    circle
    </span>`;
      ele.setAttribute("data-val", "0");
      result_div.innerText = game.x + "'s  turn";
    }
    value = !value;
  }
  checkWin(ele);
}
let finalPos, finalLine;

function checkWin(ele) {
  let id = ele.getAttribute("data-val");
  let arr = Array.from(document.querySelectorAll(`[data-val="${id}"]`));

  if (arr.length >= 3) {
    let tiles_array = Array.from(tiles);
    tiles_array = tiles_array.filter((tile) => tile.innerText === "");
    if (tiles_array.length == 0) {
      result_div.innerText = "Draw";
    }

    let parse_arr = [];

    arr.forEach((e) => {
      parse_arr.push(parseInt(e.getAttribute("id")));
    });
    let t = [];
    winPostions.forEach((loop) => {
      t.push(
        parse_arr.includes(loop[0]) &&
          parse_arr.includes(loop[1]) &&
          parse_arr.includes(loop[2])
          ? true
          : false
      );
    });
    if (t.includes(true)) {
      let player = "";
      let attr = ele.getAttribute("data-val");
      attr = parseInt(attr);
      switch (attr) {
        case 1:
          player = game.x;

          let itemsX = document.querySelectorAll('[data-val="1"] span');

          finalPos = Array.from(itemsX).map((i) => {
            return parseInt(i.parentElement.getAttribute("id"));
          });

          finalLine = winPostions.filter((i) => {
            let count = 1;

            i.forEach((k) => {
              if (finalPos.includes(k)) {
                count++;
              }
            });

            return count > 3 ? true : false;
          });

          itemsX.forEach((i) => {
            finalLine[0].forEach((k) => {
              if (i.parentElement.getAttribute("id") == k) {
                i.classList.add("color");
              }
            });
          });

          break;

        case 0:
          player = game.o;
          let itemsO = document.querySelectorAll('[data-val="0"] span');

          finalPos = Array.from(itemsO).map((i) => {
            return parseInt(i.parentElement.getAttribute("id"));
          });

          finalLine = winPostions.filter((i) => {
            let count = 1;

            i.forEach((k) => {
              if (finalPos.includes(k)) {
                count++;
              }
            });

            return count > 3 ? true : false;
          });

          itemsO.forEach((i) => {
            finalLine[0].forEach((k) => {
              if (i.parentElement.getAttribute("id") == k) {
                i.classList.add("color");
              }
            });
          });

          break;

        default:
        // silence
      }
      streak.push(player);
      result_div.innerText = player + " wins";
      frequency();
      game.classList.add("events");
      btn.classList.remove("disabled");
      btn.disabled = false;
    }
  }

  if (result_div.innerText.toLowerCase().includes("draw")) {
    game.classList.add("events");
    btn.classList.remove("disabled");
    btn.disabled = false;
    streak.push("draw");
    frequency();
  }
}
function reset() {
  document.querySelectorAll(".tile").forEach((item) => {
    item.innerText = "";
    item.removeAttribute("data-set");
    item.removeAttribute("data-val");
  });

  result_div.innerText =
    value === true ? game.x + "'s turn" : game.o + "'s turn";
  game.classList.remove("events");
  btn.classList.add("disabled");
  btn.disabled = true;
  document.querySelectorAll(".color").forEach((ele) => {
    ele.classList.remove("color");
  });
}

function frequency() {
  draws = streak.filter((item) => item === "draw");
  player_one_wins = streak.filter((item) => item === player_one);

  player_two_wins = streak.filter((item) => item === player_two);

  draws = draws.length;
  player_one_wins = player_one_wins.length;
  player_two_wins = player_two_wins.length;

  p1_div.innerText = player_one_wins;
  p2_div.innerText = player_two_wins;
  draw_div.innerText = draws;
}

function switch_turn() {
  value = !value;
  result_div.innerText =
    value === true ? game.x + "'s turn" : game.o + "'s turn";
}

function swap() {
  let a = game.o;
  let b = game.x;

  game.o = b;
  game.x = a;

  result_div.innerText =
    value === true ? game.x + "'s turn" : game.o + "'s turn";

  if (game.x === player_one) {
    p1_name.innerText = player_one + "(×)";
    p2_name.innerText = player_two + "(o)";
  } else {
    p1_name.innerText = player_one + "(o)";
    p2_name.innerText = player_two + "(×)";
  }
}
