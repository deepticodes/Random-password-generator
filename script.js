const lengthSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

const characters = { //object of letters,numbers and symbols
    lowercase:"abcdefghijklmnopqrstuvwxyz",
    uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers:"0123456789",
    symbols:"^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        passLength = lengthSlider.value,
        excDuplicate = false;
        
    options.forEach(option => { //looping through each option's checkbox
        if(option.checked) {
            if(option.id !== "exc-duplicate" && option.id !== "spaces"){
                staticPassword += characters[option.id]; //adding particular key value from character object to staticPassword
            }else if (option.id === "spaces") {
                //if checkbox id is spaces
                staticPassword += ` ${staticPassword} `;//adding space at the beginning and end of the staticPassword
            }else{ //else pass true value to excludeDuplicate
                excDuplicate = true;
            }
        }
    });
   
    for(let i = 0; i < passLength; i++) {
        //getting random character from the static password
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excDuplicate) { //if excludeDuplicate is true
         //if randomPassword doesn't contains the current random character or randomChar is equal to space " " then add random character to randomPassword else decrement by -1 
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }else { //else add random character to randomPassword
            randomPassword += randomChar;
        }
    }
    //console.log(randomPassword);
    passwordInput.value = randomPassword; //passing randomPassword to passwordInput value
}

const updatePassIndicator = () => {
    //if lengthSlider value is less than 8 then pass "weak" as passIndicator id else id lengthSLider value is less than 16 then pass "medium" as id  else pass "strong" as id
    passIndicator.id = lengthSlider.value <=8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
  //passing slider value as counter text
  document.querySelector(".pass-length span").innerText=lengthSlider.value;
  //console.log(lengthSlider.value);
  generatePassword();
  updatePassIndicator();
}

updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);//copying random password
    copyIcon.innerText = "check";//changing copy icon to tick
    setTimeout(() => { //after 1500 ms, changing tick icon back to copy
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    },1500);
}

copyIcon.addEventListener("click",copyPassword);
lengthSlider.addEventListener("input",updateSlider);
generateBtn.addEventListener("click",generatePassword);
