let array = [];

function generateArray() {
    array = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    displayArray(array);
    displayArrayValues(array);
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
    document.getElementById('startSortBtn').disabled = true;

    if (selectedSort.value === 'insertion') {
        await insertionSort(array);
    } else if (selectedSort.value === 'selection') {
        await selectionSort(array);
    } else if (selectedSort.value === 'bubble') {
        await bubbleSort(array);
    }
    document.getElementById('startSortBtn').disabled = false;
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
let isHanoiInProgress = false;

function initializeTowerOfHanoi() {
    document.getElementById('initBtn').disabled = true;

    const numDisks = parseInt(document.getElementById('numDisks').value);

    if (numDisks < 1 || numDisks > 10) {
        alert("Please enter a number between 1 and 10");
        return;
    }

    document.getElementById('peg1').innerHTML = '';
    document.getElementById('peg2').innerHTML = '';
    document.getElementById('peg3').innerHTML = '';

    const peg1 = document.getElementById('peg1');
    for (let i = numDisks; i > 0; i--) {
        const disk = document.createElement('div');
        disk.className = 'disk';
        disk.style.width = (20 + i * 9) + 'px';
        disk.innerText = i;
        disk.dataset.size = i;
        peg1.appendChild(disk);
    }
    document.getElementById('startBtn').disabled = false;
}

function startTowerOfHanoi() {
    if (isHanoiInProgress) {
        alert("A Tower of Hanoi puzzle is already in progress!");
        return;
    }

    const numDisks = parseInt(document.getElementById('numDisks').value);

    if (numDisks < 1 || numDisks > 10) {
        alert("Please enter a number between 1 and 10");
        return;
    }

    document.getElementById('startBtn').disabled = true;
    document.getElementById('initBtn').disabled = true;

    document.getElementById('peg1').innerHTML = '';
    document.getElementById('peg2').innerHTML = '';
    document.getElementById('peg3').innerHTML = '';

    const peg1 = document.getElementById('peg1');
    for (let i = numDisks; i > 0; i--) {
        const disk = document.createElement('div');
        disk.className = 'disk';
        disk.style.width = (20 + i * 9) + 'px';
        disk.innerText = i;
        disk.dataset.size = i;
        peg1.appendChild(disk);
    }

    setTimeout(() => {
        isHanoiInProgress = true;

        const moves = [];
        hanoiSolver(numDisks, 1, 3, 2, moves);

        animateMoves(moves);
    }, 100);
}

function hanoiSolver(n, fromPeg, toPeg, auxPeg, moves) {
    if (n === 1) {
        moves.push({ from: fromPeg, to: toPeg });
        return;
    }
    hanoiSolver(n - 1, fromPeg, auxPeg, toPeg, moves);
    moves.push({ from: fromPeg, to: toPeg });
    hanoiSolver(n - 1, auxPeg, toPeg, fromPeg, moves);
}

function animateMoves(moves) {
    let index = 0;

    function moveNext() {
        if (index >= moves.length) {
            document.getElementById('startBtn').disabled = false;
            document.getElementById('initBtn').disabled = false;
            isHanoiInProgress = false;
            return;
        }

        const { from, to } = moves[index];
        moveDisk(from, to);
        index++;
        setTimeout(moveNext, 800);
    }

    moveNext();
}

function moveDisk(from, to) {
    const fromPeg = document.getElementById(`peg${from}`);
    const toPeg = document.getElementById(`peg${to}`);
    const disk = fromPeg.lastElementChild;

    if (disk) {
        toPeg.appendChild(disk);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}