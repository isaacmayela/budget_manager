// These variables store every element of the DOM

const donutProgress = document.querySelector(".donut");
const getReceiptBudget = document.getElementById("receipt_budget");
const getTotalBudget = document.getElementById("total_budget");
const allLinearProgress = document.querySelectorAll(".timer");
let totalMaterialPrice = 9726.2;//ca va changer avec le get element by id

let totalAgentPrice = 5000;

let totalWorkPrice = 3958.74;

let totalOtherPrice = 5000;//ca va changer avec le get element by id

const keys = ['receipt_progress', 'depense_progress', 'material_progress', 'other_progress'];
const progessList = [];
keys.forEach(function(key){
    progessList.push(document.getElementById(key));
})


//tout ca sera odifier quand je ferai le getbyid
function transform_budget_in_number() {
    let transformBudget = Number(getTotalBudget.innerText.replace("$ ","").replace(",",""));
    return transformBudget;
}

function transform_receipt_in_number() {
    let transformReceipt = Number(getReceiptBudget.innerText.replace("$ ","").replace(",",""));
    return transformReceipt;
}


let totalBudget = transform_budget_in_number();

let totalReceipt = transform_receipt_in_number();

let receiptInPercent = 100 * (totalReceipt/ totalBudget)

console.log(receiptInPercent);


function change_progress_color(param,width) {
    if (param >= 70 && param <= 100){

        width.style.backgroundColor = "green"

    }else if(param >= 50 && param <= 69){

        width.style.backgroundColor = "orange"

    }else{

        width.style.backgroundColor = "red"
    }
}

// change_progress_color()

// these function help to change the donut repartition

function donut_repartition() {
    let budgetPercent = totalBudget / totalBudget;
    let matPercent = totalMaterialPrice / totalBudget;
    let agentPercent = totalAgentPrice / totalBudget;
    let workPercent = totalWorkPrice / totalBudget
    let otherPercent = totalOtherPrice / totalBudget;

    donutProgress.style.background = `repeating-conic-gradient(from 0deg, #0E0A1E 0deg ${360*matPercent}deg, #45286B ${360*matPercent}deg ${360*(matPercent+agentPercent)}deg, #EBE0FF ${360*(matPercent+agentPercent)}deg ${360*(matPercent+agentPercent+workPercent)}deg, #3D91FF ${360*(matPercent+agentPercent+workPercent)}deg ${360*budgetPercent}deg)`;

}

// Here's the calling of the function
donut_repartition()

function linear_progress() {
    allLinearProgress.forEach((pregress) => {
        if (detail.innerText === "Voir") {
            index ++;
        }
    });
}
