/* 
----------------------- Variables -----------------------
*/

const pageOneHeader = document.getElementById("page-1-header");
const pageTwoHeader = document.getElementById("page-2-header");
const pageThreeHeader = document.getElementById("page-3-header");
const pageFourHeader = document.getElementById("page-4-header");
const pageFiveHeader = document.getElementById("page-5-header");

const pageOneButton = document.getElementById("button-1");
const pageTwoButton = document.getElementById("button-2");
const pageThreeButton = document.getElementById("button-3");
const pageFourButton = document.getElementById("button-4");
const pageFiveButton = document.getElementById("button-5");

const startTobaccoButton = document.getElementById("start-tobacco-button");
const stopTobaccoButton = document.getElementById("stop-tobacco-button");
const startMolassesButton = document.getElementById("start-molasses-button");
const stopMolassesButton = document.getElementById("stop-molasses-button");
const startFermentingShishaButton = document.getElementById("start-fermenting-shisha");
const stopFermentingShishaButton = document.getElementById("stop-fermenting-shisha");

const tobaccoInventory = document.getElementById("tobacco-inventory");
const molassesInventory = document.getElementById("molasses-inventory");
const shishaInventory = document.getElementById("shisha-inventory");

const activeWorkersMolasses = document.getElementById("active-workers-molasses");
const activeWorkersShisha = document.getElementById("active-workers-shisha");

const tobaccoProgress = document.getElementById("tobacco-progress-bar");
const molassesProgress = document.getElementById("molasses-progress-bar");
const shishaProgress = document.getElementById("shisha-progress-bar");


let inventoryTotals = {
    tobacco: 0,
    molasses: 0,
    shisha: 0
}

let workers = {
    activeTobacco: false,
    activeMolasses: false,
    activeShisha: false,
    tobaccoGain: 1,
    molassesGain: 1,
    shishaGain: 1,
    tobaccoSpeed: 1000,
    molassesSpeed: 1000,
    shishaSpeed: 2000
}

let tobaccoProgressBar = 0;
let molassesProgressBar = 0;
let shishaProgressBar = 0;

let tobaccoTimeoutID;
let molassesTimeoutID;
let shishaTimeoutID;

let tobaccoProgressBarTimeoutID;
let molassesProgressBarTimeoutID;
let shishaProgressBarTimeoutID;

/* 
----------------------- Functions -----------------------
*/

// On startup function to set the game

function init() {
    pageOneHeader.style.display = "block";
    pageTwoHeader.style.display = "none";
    pageThreeHeader.style.display = "none";
    pageFourHeader.style.display = "none";
    pageFiveHeader.style.display = "none";
    tobaccoInventory.innerHTML = "Tobacco: " + inventoryTotals.tobacco;
    molassesInventory.innerHTML = "Molasses: " + inventoryTotals.molasses;
    shishaInventory.innerHTML = "Shisha: " + inventoryTotals.shisha;
    stopTobaccoButton.disabled = true;
    stopTobaccoButton.style.backgroundColor = "grey";
    stopMolassesButton.disabled = true;
    stopMolassesButton.style.backgroundColor = "grey";
    stopFermentingShishaButton.disabled = true;
    stopFermentingShishaButton.style.backgroundColor = "grey";
    startFermentingShishaButton.disabled = true;
    startFermentingShishaButton.style.backgroundColor = "grey";
}

init();

// Menu toggle functions ****Goal on slimming this down to 1 function that uses a param to toggle all****

function showPageOne() {
    if (pageOneHeader.style.display == "none") {
        pageOneHeader.style.display = "block";
        pageTwoHeader.style.display = "none";
        pageThreeHeader.style.display = "none";
        pageFourHeader.style.display = "none";
        pageFiveHeader.style.display = "none";
    }
}

function showPageTwo() {
    if (pageTwoHeader.style.display == "none") {
        pageOneHeader.style.display = "none";
        pageTwoHeader.style.display = "block";
        pageThreeHeader.style.display = "none";
        pageFourHeader.style.display = "none";
        pageFiveHeader.style.display = "none";
    }
}

function showPageThree() {
    if (pageThreeHeader.style.display == "none") {
        pageOneHeader.style.display = "none";
        pageTwoHeader.style.display = "none";
        pageThreeHeader.style.display = "block";
        pageFourHeader.style.display = "none";
        pageFiveHeader.style.display = "none";
    }
}

function showPageFour() {
    if (pageFourHeader.style.display == "none") {
        pageOneHeader.style.display = "none";
        pageTwoHeader.style.display = "none";
        pageThreeHeader.style.display = "none";
        pageFourHeader.style.display = "block";
        pageFiveHeader.style.display = "none";
    }
}

function showPageFive() {
    if (pageFiveHeader.style.display == "none") {
        pageOneHeader.style.display = "none";
        pageTwoHeader.style.display = "none";
        pageThreeHeader.style.display = "none";
        pageFourHeader.style.display = "none";
        pageFiveHeader.style.display = "block";
    }
}

// Update Inventory Functions

function updateTobaccoInventory() {
    tobaccoInventory.innerHTML = "Tobacco: " + inventoryTotals.tobacco;
}

function updateMolassesInventory() {
    molassesInventory.innerHTML = "Molasses: " + inventoryTotals.molasses;
}

function updateShishaInventory() {
    shishaInventory.innerHTML = "Shisha: " + inventoryTotals.shisha;
}

// Game Mechanics Functions

// Tobacco Functions

function checkTobaccoActiveWorkers() {
    if (workers.activeTobacco === false && workers.activeMolasses === false && workers.activeShisha === false) {
        workers.activeTobacco = true;
        stopTobaccoButton.disabled = false;
        stopTobaccoButton.style.backgroundColor = "black";
        startTobaccoButton.disabled = true;
        startTobaccoButton.style.backgroundColor = "grey";
        startMolassesButton.disabled = true;
        startMolassesButton.style.backgroundColor = "grey";
        startFermentingShishaButton.disabled = true;
        startFermentingShishaButton.style.backgroundColor = "grey";
        if (workers.activeTobacco === true) {
            tobaccoProgressBarMove();
            tobaccoTimeoutID = setTimeout(() => { tobaccoFarm(), tobaccoProgressBarMove() }, workers.tobaccoSpeed);
        }
    }
}

function tobaccoFarm() {
    if (workers.activeTobacco === true) {
        inventoryTotals.tobacco += workers.tobaccoGain;
        updateTobaccoInventory();
        tobaccoProgressBarMove();
        tobaccoTimeoutID = setTimeout(() => { tobaccoFarm() }, workers.tobaccoSpeed);
    }
}

function stopTobaccoFarm() {
    workers.activeTobacco = false;
    startTobaccoButton.disabled = false;
    startTobaccoButton.style.backgroundColor = "black";
    startMolassesButton.disabled = false;
    startMolassesButton.style.backgroundColor = "black";
    stopTobaccoButton.disabled = true;
    stopTobaccoButton.style.backgroundColor = "grey";
    if (inventoryTotals.molasses >= 1 && inventoryTotals.tobacco >= 1) {
        startFermentingShishaButton.disabled = false;
        startFermentingShishaButton.style.backgroundColor = "black";
    }
    clearTimeout(tobaccoTimeoutID);
    clearInterval(tobaccoProgressBarTimeoutID);
    tobaccoProgressBar = 0;
    tobaccoProgress.style.width = 0;
}

function tobaccoProgressBarMove() {
    if (tobaccoProgressBar == 0) {
        tobaccoProgressBar = 1;
        var width = 1;
        tobaccoProgressBarTimeoutID = setInterval(frame, workers.tobaccoSpeed / 100);
        function frame() {
            if (width >= 100) {
                clearInterval(tobaccoProgressBarTimeoutID);
                tobaccoProgressBar = 0;
            } else {
                width++;
                tobaccoProgress.style.width = width + "%";
            }
        }
    }
}

// Molasses Functions

function checkMolassesActiveWorkers() {
    if (workers.activeTobacco === false && workers.activeMolasses === false && workers.activeShisha === false) {
        workers.activeMolasses = true;
        stopMolassesButton.disabled = false;
        stopMolassesButton.style.backgroundColor = "black";
        startTobaccoButton.disabled = true;
        startTobaccoButton.style.backgroundColor = "grey";
        startMolassesButton.disabled = true;
        startMolassesButton.style.backgroundColor = "grey";
        startFermentingShishaButton.disabled = true;
        startFermentingShishaButton.style.backgroundColor = "grey";
        if (workers.activeMolasses === true) {
            molassesProgressBarMove();
            molassesTimeoutID = setTimeout(() => { molassesFarm(), molassesProgressBarMove() }, workers.molassesSpeed);
        }
    }
}

function molassesFarm() {
    if (workers.activeMolasses === true) {
        inventoryTotals.molasses += workers.molassesGain;
        updateMolassesInventory();
        molassesProgressBarMove();
        molassesTimeoutID = setTimeout(() => { molassesFarm() }, workers.molassesSpeed);
    }
}

function stopMolassesFarm() {
    workers.activeMolasses = false;
    startTobaccoButton.disabled = false;
    startTobaccoButton.style.backgroundColor = "black";
    startMolassesButton.disabled = false;
    startMolassesButton.style.backgroundColor = "black";
    stopMolassesButton.disabled = true;
    stopMolassesButton.style.backgroundColor = "grey";
    if (inventoryTotals.molasses >= 1 && inventoryTotals.tobacco >= 1) {
        startFermentingShishaButton.disabled = false;
        startFermentingShishaButton.style.backgroundColor = "black";
    }
    clearTimeout(molassesTimeoutID);
    clearInterval(molassesProgressBarTimeoutID);
    molassesProgressBar = 0;
    molassesProgress.style.width = 0;
}

function molassesProgressBarMove() {
    if (molassesProgressBar == 0) {
        molassesProgressBar = 1;
        var width = 1;
        molassesProgressBarTimeoutID = setInterval(frame, workers.molassesSpeed / 100);
        function frame() {
            if (width >= 100) {
                clearInterval(molassesProgressBarTimeoutID);
                molassesProgressBar = 0;
            } else {
                width++;
                molassesProgress.style.width = width + "%";
            }
        }
    }
}

function fermentShisha() {
    if (inventoryTotals.molasses >= 1 && inventoryTotals.tobacco >= 1) {
        workers.activeShisha = true;
        stopFermentingShishaButton.disabled = false;
        stopFermentingShishaButton.style.backgroundColor = "black";
        startTobaccoButton.disabled = true;
        startTobaccoButton.style.backgroundColor = "grey";
        startMolassesButton.disabled = true;
        startMolassesButton.style.backgroundColor = "grey";
        shishaProgressBarMove();
        shishaTimeoutID = setTimeout(() => { 
            inventoryTotals.shisha += workers.shishaGain,
            updateShishaInventory(),
            inventoryTotals.tobacco--,
            updateTobaccoInventory(),
            inventoryTotals.molasses--,
            updateMolassesInventory(),
            fermentShisha()
        }, workers.shishaSpeed);
    } else {
        workers.activeShisha = false;
        startTobaccoButton.disabled = false;
        startTobaccoButton.style.backgroundColor = "black";
        startMolassesButton.disabled = false;
        startMolassesButton.style.backgroundColor = "black";
        stopFermentingShishaButton.disabled = true;
        stopFermentingShishaButton.style.backgroundColor = "grey";
        startFermentingShishaButton.disabled = true;
        startFermentingShishaButton.style.backgroundColor = "grey";
        clearTimeout(shishaTimeoutID);
        clearInterval(shishaProgressBarTimeoutID);
        shishaProgressBar = 0;
        shishaProgress.style.width = 0;
    }
}

function stopShishaFarm() {
    if (inventoryTotals.molasses >= 1 && inventoryTotals.tobacco >= 1) {
        startFermentingShishaButton.disabled = false;
        startFermentingShishaButton.style.backgroundColor = "black";
    }
    workers.activeShisha = false;
    startTobaccoButton.disabled = false;
    startTobaccoButton.style.backgroundColor = "black";
    startMolassesButton.disabled = false;
    startMolassesButton.style.backgroundColor = "black";
    stopFermentingShishaButton.disabled = true;
    stopFermentingShishaButton.style.backgroundColor = "grey";
    clearTimeout(shishaTimeoutID);
    clearInterval(shishaProgressBarTimeoutID);
    shishaProgressBar = 0;
    shishaProgress.style.width = 0;
}

function shishaProgressBarMove() {
    if (shishaProgressBar == 0) {
        shishaProgressBar = 1;
        var width = 1;
        shishaProgressBarTimeoutID = setInterval(frame, workers.shishaSpeed / 100);
        function frame() {
            if (width >= 100) {
                clearInterval(shishaProgressBarTimeoutID);
                shishaProgressBar = 0;
            } else {
                width++;
                shishaProgress.style.width = width + "%";
            }
        }
    }
}

/* 
----------------------- Buttons Onclick -----------------------
*/

pageOneButton.onclick = showPageOne;
pageTwoButton.onclick = showPageTwo;
pageThreeButton.onclick = showPageThree;
pageFourButton.onclick = showPageFour;
pageFiveButton.onclick = showPageFive;

startTobaccoButton.onclick = checkTobaccoActiveWorkers;
stopTobaccoButton.onclick = stopTobaccoFarm;

startMolassesButton.onclick = checkMolassesActiveWorkers;
stopMolassesButton.onclick = stopMolassesFarm;

// startFermentingShishaButton.onclick = checkShisha;
startFermentingShishaButton.onclick = fermentShisha;
stopFermentingShishaButton.onclick = stopShishaFarm;