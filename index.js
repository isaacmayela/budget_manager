// These variables store every element of the DOM

const donutProgress = document.querySelector(".donut");
const getReceiptBudget = document.getElementById("receipt_budget");
const getTotalBudget = document.getElementById("total_budget");
const allLinearProgress = document.querySelectorAll(".timer");
const badgeOfRepartition = document.getElementById("badge");
const getAllTableRow = document.querySelectorAll("table tbody tr");
let totalMaterialPrice = 9726.2;//ca va changer avec le get element by id

let totalAgentPrice = 5000;

let totalWorkPrice = 3958.74;

let totalOtherPrice = 5000;//ca va changer avec le get element by id

const keys = ['receipt_progress', 'depense_progress', 'material_progress', 'other_progress'];
const progessList = [];
keys.forEach(function(key){
    progessList.push(document.getElementById(key));
})


// Here is the storing of the functions

// those functions tranform the total budget and the receipt budget in number
function transform_budget_in_number() {
    let transformBudget = Number(getTotalBudget.innerText.replace("$ ","").replace(",",""));
    return transformBudget;
}

function transform_receipt_in_number() {
    let transformReceipt = Number(getReceiptBudget.innerText.replace("$ ","").replace(",",""));
    return transformReceipt;
}

// these function help to compute all the depense

let allDepense = 0
function depense_computation() {
    getAllTableRow.forEach((tableRow) =>{
        if (tableRow.querySelector(".buying").innerText === "Acheté" || tableRow.querySelector(".buying").innerText === "Payé"){
            allDepense +=  Number(tableRow.querySelector(".price").innerText.replace("$",""))
        };
    })
}

// These function handle the progress
function handle_progress() {
    progessList[0].style.width = `${receiptInPercent}%`
    change_progress_color(receiptInPercent, progessList[0])
}

// these function help to change the progress colors
function change_progress_color(param,width) {
    if (param >= 70 && param <= 100){

        width.style.backgroundColor = "green"

    }else if(param >= 50 && param <= 69){

        width.style.backgroundColor = "orange"

    }else{

        width.style.backgroundColor = "red"
    }
}

// these function help to change the donut repartition

function donut_repartition() {
    let budgetPercent = totalBudget / totalBudget;
    let matPercent = totalMaterialPrice / totalBudget;
    let agentPercent = totalAgentPrice / totalBudget;
    let workPercent = totalWorkPrice / totalBudget

    donutProgress.style.background = `repeating-conic-gradient(from 0deg, #0E0A1E 0deg ${360*matPercent}deg, #45286B ${360*matPercent}deg ${360*(matPercent+agentPercent)}deg, #EBE0FF ${360*(matPercent+agentPercent)}deg ${360*(matPercent+agentPercent+workPercent)}deg, #3D91FF ${360*(matPercent+agentPercent+workPercent)}deg ${360*budgetPercent}deg)`;

}


let totalBudget = transform_budget_in_number();

let totalReceipt = transform_receipt_in_number();

let receiptInPercent = 100 * (totalReceipt/ totalBudget)

change_progress_color(receiptInPercent, badgeOfRepartition)

handle_progress()

donut_repartition()
