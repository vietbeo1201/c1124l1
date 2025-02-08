// draw maze
let level1 = [
    [1, 0, 1, 0],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 1]
]
let level2 = [
    [1, 1, 1, 0, 1, 0],
    [1, 0, 1, 1, 1, 1],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0],
    [1, 1, 1, 0, 1, 1]
]
let level3 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
]

// level devision
let mazearray = level1;
let Level = document.getElementById("levelselect");
Level.addEventListener("change", function () {
    level = Level.value;
    if (level == 1) {
        mazearray = level1;
    }
    if (level == 2) {
        mazearray = level2;
    }
    if (level == 3) {
        mazearray = level3;
    }
    maze.innerHTML = `
            <img id="sizuka" src="sizuka2.jpeg" alt="sizuka"/>
            <img id="nobita" src="Nobita.jpeg" alt="nobita"/>
        `;
    createMaze();
})


class Character {
    constructor(name, img, position) {
        this.name = name;
        this.img = img;
        this.position = position;
    }
}
let maze = document.getElementById('maze-container');
const character1 = new Character("nobita","Nobita.jpeg",[0, 0]);
let character2 = new character2("sizuka","sizuka.jpeg",[0, 0]);
//event(e)

nobita.pos = getpos(nobita);
display(nobita);

function display(person)
{
    print(person)
}
 function getpos(person){
     //pos
     return pos;
 }

// create maze by upper matrix
function createMaze() {
    for (let i = 0; i < mazearray.length; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < mazearray[i].length; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');

            if (mazearray[i][j] === 0) {
                cell.classList.add('wall')
            }
            if (i == 0 && j == 0) {
                mazearray[i][j] = 2;
            }
            row.appendChild(cell);
        }
        maze.appendChild(row)
    }

    getnobitaPosition()
}

// get nobita position
function getnobitaPosition() {
    let position = [-1, -1]
    for (let i = 0; i < mazearray.length; i++) {
        for (let j = 0; j < mazearray[i].length; j++) {
            if (mazearray[i][j] == 2) {
                position[0] = i;
                position[1] = j;
            }
        }
    }
    return position
}

document.addEventListener('keydown', function (e) {
    let nobita = document.getElementById('nobita');
    let sizuka = document.getElementById('sizuka');
    let nobitaleft = nobita.offsetLeft;
    let nobitatop = nobita.offsetTop;
    let sizukaleft = sizuka.offsetLeft;
    let sizukatop = sizuka.offsetTop;
    let nobitaposition = getnobitaPosition();

    if (e.key == 'ArrowRight') {
        if (nobitaleft < (mazearray[0].length - 1) * 30) {
            if (mazearray[nobitaposition[0]][nobitaposition[1] + 1] == 1) {
                nobitaleft += 30;
                nobita.style.left = nobitaleft + 'px';
                mazearray[nobitaposition[0]][nobitaposition[1]] = 1;
                mazearray[nobitaposition[0]][nobitaposition[1] + 1] = 2;
                console.log(mazearray)
            } else Swal.fire({
                title: 'you hit the wall',
                icon: 'warning',
                confirmButtonText: 'lets continue',
            })
        } else Swal.fire({
            title: 'you hit the maze',
            icon: 'warning',
            confirmButtonText: 'lets continue',
        })
    }
    if (e.key == 'ArrowLeft') {
        if (nobitaleft > 0) {
            if (mazearray[nobitaposition[0]][nobitaposition[1] - 1] == 1) {
                nobitaleft -= 30;
                nobita.style.left = nobitaleft + 'px';
                mazearray[nobitaposition[0]][nobitaposition[1]] = 1;
                mazearray[nobitaposition[0]][nobitaposition[1] - 1] = 2;
                console.log(mazearray)
            } else Swal.fire({
                title: 'you hit the wall',
                icon: 'warning',
                confirmButtonText: 'lets continue',
            })
        } else Swal.fire({
            title: 'you hit the maze',
            icon: 'warning',
            confirmButtonText: 'lets continue',
        })
    }
    if (e.key == 'ArrowUp') {
        if (nobitatop > 0) {
            if (mazearray[nobitaposition[0] - 1][nobitaposition[1]] == 1) {
                nobitatop -= 30;
                nobita.style.top = nobitatop + 'px';
                mazearray[nobitaposition[0]][nobitaposition[1]] = 1;
                mazearray[nobitaposition[0] - 1][nobitaposition[1]] = 2;
                console.log(mazearray)
            } else Swal.fire({
                title: 'you hit the wall',
                icon: 'warning',
                confirmButtonText: 'lets continue',
            })
        } else Swal.fire({
            title: 'you hit the maze',
            icon: 'warning',
            confirmButtonText: 'lets continue',
        })
    }
    if (e.key == 'ArrowDown') {
        if (nobitatop < (mazearray.length - 1) * 30) {
            if (mazearray[nobitaposition[0] + 1][nobitaposition[1]] == 1) {
                nobitatop += 30;
                nobita.style.top = nobitatop + 'px';
                mazearray[nobitaposition[0]][nobitaposition[1]] = 1;
                mazearray[nobitaposition[0] + 1][nobitaposition[1]] = 2;
                console.log(mazearray)
            } else Swal.fire({
                title: 'you hit the wall',
                icon: 'warning',
                confirmButtonText: 'lets continue',
            })
        } else Swal.fire({
            title: 'you hit the maze',
            icon: 'warning',
            confirmButtonText: 'lets continue',
        })
    }

    if (nobitaleft == sizukaleft && nobitatop == sizukatop) {
        Swal.fire({
            title: 'you got it',
            icon: 'success',
            confirmButtonText: 'lets try again',
        })
        setTimeout(function () {
            location.reload();
        }, 2500);

    }
})

// setSizukaPosition(0, 0);
// setNobitaPosition(0, 0);
