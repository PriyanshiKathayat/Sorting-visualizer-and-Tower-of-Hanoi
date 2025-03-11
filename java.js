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

async function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = await partition(arr, low, high);

        await quickSort(arr, low, pi - 1);  // Before partition
        await quickSort(arr, pi + 1, high); // After partition
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap
            displayArray(arr);
            displayArrayValues(arr);
            await delay(1000);
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  // Swap pivot
    displayArray(arr);
    displayArrayValues(arr);
    await delay(1000);

    return i + 1;
}

async function heapSort(arr) {
    const n = arr.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];  // Swap
        displayArray(arr);
        displayArrayValues(arr);
        await delay(500);

        // Heapify the root element again
        await heapify(arr, i, 0);
    }
}

async function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        displayArray(arr);
        displayArrayValues(arr);
        await delay(1000);

        await heapify(arr, n, largest);
    }
}

async function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    await mergeSort(left);
    await mergeSort(right);

    const merged = await merge(left, right);
    for (let i = 0; i < merged.length; i++) {
        arr[i] = merged[i];
    }

    displayArray(arr);
    displayArrayValues(arr);
    await delay(1000);

    return arr;
}

async function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        disk.style.width = (20 + i * 15) + 'px';
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