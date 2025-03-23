let array = [];

function generateArray() {
    array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    displayArray(array);
    displayArrayValues(array);  // Show the actual numbers
}

function displayArrayValues(arr) {
    const arrayValuesDiv = document.getElementById('arrayValues');
    arrayValuesDiv.innerText = `arr[] = { ${arr.join(', ')} }`;
}

function displayArray(arr) {
    const visualizer = document.getElementById('visualizer');
    visualizer.innerHTML = ''; // Clear old bars

    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 3}px`;
        visualizer.appendChild(bar);
    });
}
async function startSorting() {
    const selectedSort = document.querySelector('input[name="sort"]:checked');
    if (!selectedSort) {
        alert("Please select a sorting algorithm!");
        return;
    }

    if (selectedSort.value === 'insertion') {
        await insertionSort(array);
    } else if (selectedSort.value === 'selection') {
        await selectionSort(array);
    } else if (selectedSort.value === 'bubble') {
        await bubbleSort(array);
    } else if (selectedSort.value === 'quick') {
        await quickSort(array);
    } else if (selectedSort.value === 'merge') {
        await mergeSort(array);
    }else if (selectedSort.value === 'heap') {
        await heapSort(array);
    }
    // array.sort(function(a, b){return a - b});;
    // displayArrayValues(array);
}

async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            displayArray(arr);
            await delay(1000);
        }
        arr[j + 1] = key;
        displayArray(arr);
        displayArrayValues(arr);
        await delay(1000);
    }
}

async function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        displayArray(arr);
        displayArrayValues(arr);
        await delay(1000);
    }
}

async function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                displayArray(arr);
                displayArrayValues(arr);
                await delay(1000);
            }
        }
    }
}


// Tower of Hanoi Logic

function startTowerOfHanoi() {
    const numDisks = parseInt(document.getElementById('numDisks').value);
    // if (numDisks < 1 || numDisks > 6) {
    //     alert("Please enter a number between 1 and 6");
    //     return;
    // }

    // Clear pegs before new visualization

    document.getElementById('peg1').innerHTML = '';
    document.getElementById('peg2').innerHTML = '';
    document.getElementById('peg3').innerHTML = '';

    // Create initial disks on peg 1
    const peg1 = document.getElementById('peg1');
    for (let i = numDisks; i > 0; i--) {
        const disk = document.createElement('div');
        disk.className = 'disk';
        disk.style.width = (20 + i * 9) + 'px';
        disk.innerText = i;
        disk.dataset.size = i;
        peg1.appendChild(disk);
    }

    // Perform the Hanoi algorithm
    const moves = [];
    hanoiSolver(numDisks, 1, 3, 2, moves);

    // Animate the moves
    animateMoves(moves);
}

// Recursive solver for Tower of Hanoi
function hanoiSolver(n, fromPeg, toPeg, auxPeg, moves) {
    if (n === 1) {
        moves.push({from: fromPeg, to: toPeg});
        return;
    }
    hanoiSolver(n - 1, fromPeg, auxPeg, toPeg, moves);
    moves.push({from: fromPeg, to: toPeg});
    hanoiSolver(n - 1, auxPeg, toPeg, fromPeg, moves);
}

// Animate the moves step by step
function animateMoves(moves) {
    let index = 0;

    function moveNext() {
        if (index >= moves.length) {
            return; // All moves completed
        }

        const {from, to} = moves[index];
        moveDisk(from, to);
        index++;
        setTimeout(moveNext, 800); // Delay between moves
    }

    moveNext();
}

// Move disk from one peg to another
function moveDisk(from, to) {
    const fromPeg = document.getElementById(`peg${from}`);
    const toPeg = document.getElementById(`peg${to}`);
    const disk = fromPeg.lastElementChild;

    if (disk) {
        toPeg.appendChild(disk);
    }
}