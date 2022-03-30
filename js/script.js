{
    let numbersUser = [];
    let numbersDraw = [];
    //----------------------------------------------
    // Settings draw
    //----------------------------------------------
    const validateSetings = settingsValue => {
        for (const value in settingsValue) {
            if (settingsValue[value] <= 0) {
                return `The specified value is not a number or is less than or equal to zero.`;
            }
        }

        if (settingsValue.min > settingsValue.max) {
            return `The minimum value cannot be greater than the maximum value.`;
        }

        if (settingsValue.howMuchDraw >= (settingsValue.max - settingsValue.min) + 2) {
            return `The range cannot be smaller than the number of numbers to be drawn.`;
        }

        if (settingsValue.howMuchDraw > 6) {
            return `The number of fields cannot exceed 6.`;
        }
        return settingsValue;
    };

    const setings = () => {
        const settingsValue = {
            howMuchDraw: +document.querySelector(".js-numberDraw").value.trim(),
            min: +document.querySelector(".js-numberMin").value.trim(),
            max: +document.querySelector(".js-numberMax").value.trim(),
        }
        return validateSetings(settingsValue);
    };

    const renderInput = () => {
        const renderFormElement = document.querySelector(".js-userInput");
        const showMinElement = document.querySelector(".js-showMin");
        const showMaxElement = document.querySelector(".js-showMax");
        let createForm = "";

        const settings = setings();
        if (typeof settings === "object") {
            showMinElement.textContent = settings.min;
            showMaxElement.textContent = settings.max;

            createForm += `<div class="form__howMuchInput">`;

            for (let i = 1; i <= settings.howMuchDraw; i++) {
                createForm += `
                <input type="tel" 
                    min="${settings.min}" 
                    max="${settings.max}" 
                    step="1"
                    class="form__input form__input--user js-numberUser js-numberOk${i}"
                >`;
            }
        } else {
            createForm += `<p class="errorMesage">${settings}</p>`;
        }
        renderFormElement.innerHTML = createForm;
    };
    //----------------------------------------------

    //----------------------------------------------
    // Draw numbers
    //----------------------------------------------
    const checkWin = () => {
        const messageWin = document.querySelector(`.js-messageWin`);
        let isWin = true;

        numbersUser.forEach((valueUser, index) => {
            let inputOpacity = document.querySelector(`.js-numberOk${index + 1}`);
            if (numbersDraw.includes(valueUser)) {
                inputOpacity.classList.remove("opacity");
            } else {
                inputOpacity.classList.add("opacity");
                isWin = false;
            }
        });

        isWin 
            ? messageWin.classList.add("sectionRight_win--show") 
            : messageWin.classList.remove("sectionRight_win--show");
    };

    const renderRandomNumber = () => {
        const randomNumberElement = document.querySelector(".js-random");
        let randomNumber = "";
        for (const random of numbersDraw) {
            randomNumber += `<div class="randomNumber">${random}</div>`;
        }
        randomNumberElement.innerHTML = randomNumber;
        checkWin();
    };

    const drawNumbers = () => {
        const settings = setings();
        numbersDraw = [];
        for (let i = numbersDraw.length; numbersDraw.length <= settings.howMuchDraw - 1; i++) {
            let numberRandom = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
            if (!numbersDraw.includes(numberRandom)) {
                numbersDraw = [
                    ...numbersDraw,
                    numberRandom,
                ];
            }
        }
        renderRandomNumber();
    };
    //---------------------------------------------

    //----------------------------------------------
    // Valid user number
    //----------------------------------------------
    const validateUserNumber = () => {
        const numberUserElement = document.querySelectorAll(".js-numberUser");
        const settings = setings();

        numbersUser = [];
        for (const valueInput of numberUserElement) {
            let value = +valueInput.value;

            if (isNaN(value)) {
                return `The value entered is not a number.`;
            }

            if (numbersUser.includes(value)) {
                return `The same numbers are given`;
            }

            if (value >= +settings.min && value <= +settings.max) {
                numbersUser = [
                    ...numbersUser,
                    value,
                ];
            } else {
                return `The number is not in the range`;
            }
        }
        return numbersUser;
    };

    const checkNumberUser = () => {
        const randomNumberElement = document.querySelector(".js-random");
        const userNumber = validateUserNumber();

        if (typeof userNumber === "object") {
            drawNumbers();
        } else {
            randomNumberElement.innerHTML = `<p class="errorMesage">${userNumber}</p>`;
        }
    };
    //---------------------------------------------

    //----------------------------------------------
    // Actions for buttons that changes the theme
    //----------------------------------------------
    const changeTheme = buttonsTheme => {
        const pageTemplateElement = document.querySelector(".js-template");
        for (const theme of buttonsTheme) {
            let buttonTheme = document.querySelector(`.${theme.buttonName}`);
            buttonTheme.addEventListener("click", () => {
                pageTemplateElement.dataset.nametheme = theme.themeName;
            });
        }
    };

    const donwloadButtonsTheme = () => {
        const buttonsThemeElement = document.querySelectorAll(".js-buttonTheme");
        let buttonsTheme = [];
        for (const button of buttonsThemeElement) {
            buttonsTheme = [
                ...buttonsTheme,
                {
                    themeName: button.dataset.themename,
                    buttonName: `js-${button.dataset.themename}`,
                },
            ];
        }
        changeTheme(buttonsTheme);
    };
    //----------------------------------------------

    //----------------------------------------------
    // Application initialization 
    //----------------------------------------------
    const startRender = event => {
        event.preventDefault();
        renderInput();
        document.querySelector(".js-random").innerHTML = "";
    };

    const init = () => {
        const userNumber = document.querySelector(".js-draw");
        const sendFormSetings = document.querySelector(".js-applySettings");

        userNumber.addEventListener("click", checkNumberUser);
        sendFormSetings.addEventListener("click", startRender);

        donwloadButtonsTheme();
        renderInput();
    };

    init();
    //----------------------------------
}