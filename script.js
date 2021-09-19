const W = 54;
const H = 7;
const map1 = generateMap(W, H);
const map2 = generateMap(W, H);

let activeMap1 = true;
let generation = 0;
const timeout = 100;

function run() {
    fillingMap();
    renderMap();
    timer();
}

function renderMap() {
    const _map1 = activeMap1 ? map1 : map2;
    const tbl = document.getElementsByClassName("ContributionCalendar-day");
    [...tbl].forEach((item, index) => {
        const i = Math.floor(index / 7);
        const j = index % 7;
        item.setAttribute("data-level", _map1[j][i] ? '2' : '0');
    });
}

function fillingMap() {
    const tbl = document.getElementsByClassName("ContributionCalendar-day");
    [...tbl].forEach((item, index) => {
        const i = Math.floor(index / 7);
        const j = index % 7;
        map1[j][i] = Number(item.getAttribute('data-level')) > 0;
    });
}

function generateMap(w, h) {
    return new Array(h).fill(null).map(() => {
        return new Array(w).fill(false);
    });
}

function countNeighbors(y, x) {
    const _map1 = activeMap1 ? map1 : map2;
    let res = 0;
    for (let i = - 1; i <= 1; i++) {
        for (let j = - 1; j <= 1; j++) {
            if (_map1[(y + i + H) % H][(x + j + W) % W]) {
                res++;
            }
        }
    }

    if (_map1[y][x]) {
        res--;
    }

    return res;
}

function nextGeneration() {
    const _map1 = activeMap1 ? map1 : map2;
    const _map2 = activeMap1 ? map2 : map1;
    for(let i = 0; i < H; i++) {
        for(let j = 0; j < W; j++) {
            const n =  countNeighbors(i, j);
            _map2[i][j] = (n == 3) || ((n == 2) && (_map1[i][j]));
        }
    }
    activeMap1 = !activeMap1;
    generation++;
}

function timer() {
    nextGeneration();
    renderMap();
    setTimeout(timer, timeout);
}

run();