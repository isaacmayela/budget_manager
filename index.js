// These variables store every element of the DOM

const donutProgress = document.querySelector(".donut");
const getReceiptBudget = document.getElementById("receipt_budget");
const getTotalBudget = document.getElementById("total_budget");
const allLinearProgress = document.querySelectorAll(".timer");
const badgeOfRepartition = document.getElementById("badge");
const getAllTableRow = document.querySelectorAll("table tbody tr");
const allStatus = document.querySelectorAll(".buying");
const budgetDetails = document.getElementById("detail_budget");
const containerBudgetDetails = document.getElementById("details");
const overvlay = document.getElementById("overlay");
const closeElements = document.querySelectorAll(".close");
const getAllMaterials = document.querySelector(".materials");
const getMaterialsTableRow = getAllMaterials.querySelectorAll(".materials_table table tbody tr");
const getAllOthers = document.querySelector(".others");
const getOthersTableRow = getAllOthers.querySelectorAll(".others_table table tbody tr");
let totalMaterialPrice = 9726.2;//ca va changer avec le get element by id

let totalAgentPrice = 5000;

let totalWorkPrice = 3958.74;

let totalOtherPrice = 5000;//ca va changer avec le get element by id

const keys = ['receipt_progress', 'depense_progress', 'material_progress', 'other_progress'];
const progessList = [];
keys.forEach((key) =>{
    progessList.push(document.getElementById(key));
})

const values = ['receipt_percent', 'depense_percent', 'material_percent', 'other_percent'];
const percentProgessList = [];
values.forEach((value) =>{
    percentProgessList.push(document.getElementById(value));
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

function depense_computation() {
    let allDepense = 0
    getAllTableRow.forEach((tableRow) =>{
        if (tableRow.querySelector(".buying").innerText === "Acheté" || tableRow.querySelector(".buying").innerText === "Payé"){
            allDepense +=  Number(tableRow.querySelector(".price").innerText.replace("$",""));
        };
    })
    
    return allDepense
}

// these function help to display the budget details
function display_budget_details() {
    containerBudgetDetails.style.display = "block";
    overvlay.style.display = "block";
}

// these function help to get the total materials price
function get__materials_general_price() {
    let totalMaterialsPrice = 0;
    getMaterialsTableRow.forEach((matRow) =>{
        totalMaterialsPrice +=  Number(matRow.querySelector(".price").innerText.replace("$",""));
    })
    return totalMaterialsPrice;
}

// thisn function help to get the buyed materials price
function get__materials_buyed_price() {
    let buyedMaterialsPrice = 0;
    getMaterialsTableRow.forEach((matRow) =>{
        if (matRow.querySelector(".buying").innerText === "Acheté"){
            buyedMaterialsPrice +=  Number(matRow.querySelector(".price").innerText.replace("$",""));
        };
    })
    return buyedMaterialsPrice;
}

// These function get the total other payed depense
function get__total_payed_others() {
    let payedOthers = 0;
    getOthersTableRow.forEach((otherRow) =>{
        if (otherRow.querySelector(".buying").innerText === "Payé"){
            payedOthers +=  Number(otherRow.querySelector(".price").innerText.replace("$",""));
        };
    })

    return payedOthers;
}

// These function help to close all the details
function close_all_detail() {
    containerBudgetDetails.style.display = "none";
    overvlay.style.display = "none";
}

// These function handle the progress
function handle_progress() {
    progessList[0].style.width = `${receiptInPercent}%`;
    change_progress_color(receiptInPercent, progessList[0]);

    progessList[1].style.width = `${depenseInPercent}%`;
    change_progress_color(depenseInPercent, progessList[1]);

    progessList[2].style.width = `${buyedInPercent}%`;
    change_progress_color(buyedInPercent, progessList[2]);

    progessList[3].style.width = `${payedInPercent}%`;
    change_progress_color(payedInPercent, progessList[3]);
}

function handle_progress_percent() {
    percentProgessList[0].innerText = `${Math.round(receiptInPercent)}`
    percentProgessList[1].innerText = `${Math.round(depenseInPercent)}`
    percentProgessList[2].innerText = `${Math.round(buyedInPercent)}`
    percentProgessList[3].innerText = `${Math.round(payedInPercent)}`
}

// these function help to change the progress colors
function change_progress_color(param,width) {
    if (param >= 70 && param <= 100){

        width.style.backgroundColor = "green";

    }else if(param >= 50 && param <= 69){

        width.style.backgroundColor = "orange";

    }else{

        width.style.backgroundColor = "red";
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


let allDepense = depense_computation();

let totalBudget = transform_budget_in_number();

let totalReceipt = transform_receipt_in_number();

let depenseInPercent = 100 * (allDepense / totalBudget);

let receiptInPercent = 100 * (totalReceipt/ totalBudget);

let allMaterialsPrice = get__materials_general_price();

let buyedMaterialsPrice = get__materials_buyed_price();

let buyedInPercent = 100 * (buyedMaterialsPrice / allMaterialsPrice);

let payedOthersDepense = get__total_payed_others();

let payedInPercent = 100 * (payedOthersDepense / totalBudget);

change_progress_color(receiptInPercent, badgeOfRepartition);

handle_progress();

handle_progress_percent()

donut_repartition();

function close(event) {
    event.addEventListener("click", close_all_detail)
}

budgetDetails.addEventListener("click",display_budget_details);

closeElements.forEach((element) => close(element));


const vert = document.getElementById('vert');

function coc() {
    vert.style.backgroundColor = "red"
}

vert.addEventListener("click",coc);

window.addEventListener("load",coc);
