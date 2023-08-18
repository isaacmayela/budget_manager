// // // TODO: Faire la manipulation du DOM dans ce fichier

// These variable store all the element of the DOM
let inputValue = document.getElementById("input");

const values = document.querySelectorAll(".numpad");

const displayCalcul = document.getElementById("calcul");

const equalSign = document.getElementById("equals");

const tansformInPercent = document.getElementById("percentage");

const clearInput = document.getElementById("clear");

const resetAll = document.getElementById("reset");

const plusOuMoin = document.getElementById("plusoumoins");

// Here's the suppress of the default values of input and label
inputValue.value = "";

displayCalcul.innerText = "";

let preventAlotEqual = 0;


// These table store the signs 
const keys = ['plus', 'minus', 'times', 'divideby'];
const operators = [];
keys.forEach(function(key) {
  operators.push(document.getElementById(key));
})

// These function help to clear the two list if necessary
function reinitializeInput() {
  doubleDotTable = []
  otherListe = []
}

inputValue.addEventListener("keydown", function(event) {
  event.preventDefault();
})

// These function help to reinitialize the computations when it's over
function reinitializeAll() {
  if (displayCalcul.innerText.includes("=")) {
    reinitializeInput()
    inputValue.value = "";
    displayCalcul.innerText = "";
  }
}

// These list keep all values of the input
let doubleDotTable = [];
let otherListe = [];

// These function help to suppress a lot of dot and a lot of 0
function removeDot(table) {
  let withoutDoubleDot = []

  table.forEach((item) => {
    switch (item) {
      case '0':
        if (withoutDoubleDot.length === 0) {

          withoutDoubleDot = ["0"]

        } else if (withoutDoubleDot.length >= 1 && inputValue.value !== "0") {

          withoutDoubleDot.push("0")
        }
        break;
      case '.':
        if (withoutDoubleDot.length >= 1 && !withoutDoubleDot.includes(".")) {

          withoutDoubleDot.push(".")

        } else if (withoutDoubleDot.length === 0) {

          withoutDoubleDot.push("0")

          withoutDoubleDot.push(".")
        }
        break;
      default:
        if (withoutDoubleDot.indexOf("0") === 0 && withoutDoubleDot[1] !== ".") {

          withoutDoubleDot = [item];
        } else {
          withoutDoubleDot.push(item);
        }
    }
  })

  return withoutDoubleDot

}

// These function clear the input when C is clicked
function clearTheInput() {
  reinitializeInput()
  inputValue.value = "";
}

// The function reset all when AC is clicked
function clearAll(event) {
  event.preventDefault();
  reinitializeInput()
  inputValue.value = "";
  displayCalcul.innerText = "";
}


// these function help to change the label text and help to continue computatation when the operato is clicked
function changeLabelText(event, param) {
  event.preventDefault();

  if (displayCalcul.innerText !== "" || inputValue.value !== "") {

    displayCalcul.innerText = inputValue.value + " " + param.innerText;
    inputValue.value = ""
  }

  reinitializeInput();
  preventAlotEqual = 0;
}

// these function help to change the values of the input
function changeInputValue(event) {
  reinitializeAll();
  if (displayCalcul.innerText === "") {
    doubleDotTable.push(event.target.innerText);

    inputValue.value = removeDot(doubleDotTable).join("");
  } else {
    otherListe.push(event.target.innerText);

    inputValue.value = removeDot(otherListe).join("")
  }
}

// These function change the value of the input 
function displayInputValue(event) {
  event.addEventListener("click", changeInputValue);
}


// this functions help to do to give the result when equal is clicked
function give_result(event) {
  event.preventDefault();

  preventAlotEqual += 1;

  if (preventAlotEqual > 1) {
    return
  }

  let newLabel = displayCalcul.innerText;

  let newLabelValue = newLabel.replace("×", "*").replace("÷", "/").replace("=", "");

  if (displayCalcul.innerText !== "" || inputValue.value !== "") {
    displayCalcul.innerText = `${displayCalcul.innerText} ${inputValue.value} =`
    inputValue.value = `${eval(newLabelValue + inputValue.value)}`;
  }

}

// These function help to transform the result in percent
function transformInPercent(event) {
  event.preventDefault();
  inputValue.value = Number(inputValue.value) / 100
}

// These function help to add + or -
function plus_moin() {
  if (displayCalcul.innerText !== "" || inputValue.value !== "") {
    inputValue.value = `${inputValue.value * (-1)}`
  }
}


plusOuMoin.addEventListener("click", plus_moin)

values.forEach((value) => displayInputValue(value));


operators.forEach((operator) => operator.addEventListener("click", () => {
  changeLabelText(event, operator)
}))


equalSign.addEventListener("click", give_result);

tansformInPercent.addEventListener("click", transformInPercent);

clearInput.addEventListener("click", clearTheInput);

resetAll.addEventListener("click", clearAll);

// GESTION DU ZERO DU POINT ET DU CLAVIER et du changement du signe lorsque je click sur le egal
// au click du egal je ne peut plus recliquer sur le signe