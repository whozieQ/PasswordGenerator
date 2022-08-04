const uppers =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const lowers =["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

const symbols =["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

const numbers =["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];


let generateBtn = document.getElementById("generate-btn")
let pwd1El = document.getElementById("pwd1-el")
let pwd2El = document.getElementById("pwd2-el")
let symbolEl = document.getElementById("symbol-el")
let numberEl = document.getElementById("number-el")
let symbolBox = document.getElementById("pSymbol")
let numberBox = document.getElementById("pNumber")

showNumberInfo();
showSymbolInfo();

/*Copy to clipboard*/
pwd1El.addEventListener("click", function(){
  /* Get the text field */
  let copyText = pwd1El;

  /* Select the text field */
  let copyThis = copyText.textContent;

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyThis);

  alert("Copied to clipboard");

})
pwd2El.addEventListener("click", function(){
  /* Get the text field */
  let copyText = pwd2El;

  /* Select the text field */
  let copyThis = copyText.textContent;

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyThis);

  alert("Copied to clipboard");
    
})

/*generate passwords*/
generateBtn.addEventListener("click", function() {

  pwd1El.textContent = getPwd()  
  pwd2El.textContent = getPwd()  
  
});

function showSymbolInfo(){
    if(symbolBox.checked){
        symbolEl.textContent = "(include at least one Symbol)";
    } else {
        symbolEl.textContent = "(no symbols allowed)";
    }

}
function showNumberInfo(){
    if(numberBox.checked){
        numberEl.textContent = "(include at least one Number)";
    } else {
        numberEl.textContent = "(no numbers allowed)";
    }

}
symbolBox.addEventListener("click", function(){
    showSymbolInfo();
});
numberBox.addEventListener("click", function(){
    showNumberInfo();
});


function getPwd(){
    let pwdLength = document.getElementById("pLength").value
    let upperMin = document.getElementById("pUpper").value
    
    let pwd = ""
    for (let i = 0;i < upperMin;i++){
        pwd += getUpper()
    }
    //ensure we have at least one symbol if required
    if (document.getElementById("pSymbol").checked){
        pwd += getSymbol()
    }
    //ensure we have at least one number if required
    if (document.getElementById("pNumber").checked){
        pwd += getNumber()
    }    
    let remaining = pwdLength - pwd.length
    let kind = ["upper","lower"]
    if (document.getElementById("pSymbol").checked){
        kind.push("symbol")
    }
    if (document.getElementById("pNumber").checked){
        kind.push("number")
    }
    console.log(kind)

    for (let i = 0; i < remaining; i++){
        //fill remaining chars by randomly choosing from one of the 4 char types
        let pick = Math.floor(Math.random() * kind.length)
        console.log(pick)
        console.log(kind[pick])
        if (kind[pick] === "upper"){  pwd += getUpper()}
        else if (kind[pick] === "number"){  pwd += getNumber()}
        else if (kind[pick] === "symbol"){  pwd += getSymbol()}
        else {  pwd += getLower()}
    }
    //now mixup the characters in the pwd to be random    
    let indexList = []
    for (let i = 0; i < pwd.length; i++){
        indexList.push(i)
    }
    let mixedPwd = ""
    let repeat = indexList.length
    for (let i = 0; i < repeat; i++){
        let randomIndex = Math.floor(Math.random() * indexList.length)
        mixedPwd += pwd[indexList[randomIndex]]
        indexList.splice(randomIndex,1)
    }

    return mixedPwd
}

function getUpper(){
    return  uppers[Math.floor(Math.random() * uppers.length)]
}
function getLower(){
    return  lowers[Math.floor(Math.random() * lowers.length)]
}
function getSymbol(){
    return  symbols[Math.floor(Math.random() * symbols.length)]
}
function getNumber(){
    return  numbers[Math.floor(Math.random() * numbers.length)]
}
