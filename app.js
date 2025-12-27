// Show Not showing 
const offer = document.getElementById("show");
const displayBTN = document.querySelector(".display-more");
offer.addEventListener("click", ()=>{
displayBTN.style.display = displayBTN.style.display  === "none" ? "flex" : "none";
});