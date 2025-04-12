


const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";

// populated dropdowns for api
for (let select of dropdowns) {
    for (currCode in countryList) {
        // console.log(code,countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if (select.name == "from" && currCode == "USD") {
            newOption.selected = "selected";
        }
        else if (select.name == "to" && currCode == "INR") { newOption.selected ="selected"; }
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    })
} 

// flag image update krne ke liye
const updateFlag=(element)=>{
   let currCode=element.value;
   let countryCode=countryList[currCode];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newSrc;
}   

// update event rate message
const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input")
    let amtVal=amount.value;
    if (amtVal=="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const fromCurrency=fromCurr.value.toLowerCase();
    const toCurrency=toCurr.value.toLowerCase();
    msg.textContent="Getting exchange rate..."
    try{
        // fetch exhange rate from api
        const response=await fetch(`${BASE_URL}/${fromCurrency}.json`);
        const data=await response.json;
        const rate=data[fromCurrency][toCurrency];
        // calculate converted amount 
        const finalAmount=amtVal*rate;

        // update message with exhchange rate info
        msg.textContent=`${amtVal} ${fromCurr.value}=${finalAmount.toFixed(2)} ${toCurr.value}`;


    }
    catch(error){
        msg.textContent="Error fetching exchange rate. Please try again";
        console.error(error);
    }
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault(); // prevent refreshing the page
    updateExchangeRate();
    // const URL=`${BASE_URL}`
})
window.addEventListener("load",()=>{
    updateExchangeRate();
});
