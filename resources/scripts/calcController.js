class Calculator {
    constructor(){
        //The first input number display html
        this._numberOneDisplay = document.querySelector("#numberOneDisplay");
        //The second input number / The main displayed Number
        this._mainInputDisplay = document.querySelector("#mainInputDisplay");

        //The current operator symbol html display
        this._operator = document.querySelector("#operSymbolDisplay");

        this.initialize();
    }

    set numberOne(value){
        this._numberOneDisplay.innerHTML = value;
    }

    get numberOne(){
        return this._numberOneDisplay.innerHTML;
    }

    set mainInput(value){
        this._mainInputDisplay.innerHTML = value;
    }

    get mainInput(){
        return this._mainInputDisplay.innerHTML;
    }

    set operator(value){
        this._operator.innerHTML = value;
    }

    get operator(){
        return this._operator.innerHTML;
    }

    initialize(){
        this.mainInput = "0";
        this.operator = "";
        this.initBtnEvents();
    }

    initBtnEvents(){
        let buttons = document.querySelectorAll("#pad > .btn");
        
        buttons.forEach(btn => {
            btn.addEventListener('click', e => {
                let btnText = btn.id.replace("btn-", "");
                this.executeBtn(btnText);
            });
        });
    }

    /**
     * @param {string} text 
     */
    executeBtn(text){
        switch(text){
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                this.addNumber(text);
                break;

            case 'dot':
                this.addDot();
                break;
            case 'posneg':
                this.togglePosNegNumber();
                break;

            case 'plus':
                this.addOperator('+');
                break;
            case 'minus':
                this.addOperator('-');
                break;
            case 'times':
                this.addOperator('*');
                break;
            case 'division':
                this.addOperator('/');
                break;
            case 'sqrt':
                this.calcSquareRoot();
                break;
            case 'square':
                this.calcSquareNumber();
                break;
            case 'fraction':
                this.calcFraction();
                break; 
            case 'percent':
                this.addPercentage();
                break;

            case 'equal':
                this.calculate();
                break;
            case 'clearall':
                this.clearAll();
                break;
            case 'clear':
                this.clear();
                break;
            case 'erase':
                this.erase();
                break;
            default:
                this.printError();
                break;
        }
    }

    printError(){
        this.mainInput = "Error";
        setTimeout(() =>{
            this.clearAll();
        }, 1000);
        this.resizeDisplay();
    }

    /**
     * adds the specified character to the end of the main input
     * @param {char} char char to be added
     */
    addCharToInput(char){
        this.mainInput = this.mainInput + char;
    }

    getNumericInput(){
        return this.mainInput.replace('-', '');
    }

    /**
     * Adds an number to the main display
     * @param {string} number the current number that's gonna be added
     */
    addNumber(number){
        if(this.mainInput.length < 13){
            if(this.getNumericInput() == "0" && number != "0"){
                this.mainInput = "";
                this.addCharToInput(number);
            }
            else if(this.getNumericInput() != "0"){
                this.addCharToInput(number);
            }
        }
    }

    /**
     * Defines the current operator for the operation
     * @param {string} operator the operator symbol which is going to be used
     */
    addOperator(operator){
        if(!this.operator){
            this.numberOne = parseFloat(this.mainInput);
        }
        switch(operator){
            case '+':
                this.operator = "+";
                break;
            case '-':
                this.operator = "-";
                break;
            case '*':
                this.operator = "*";
                break;
            case '/':
                this.operator = "/";
                break;
            default:
                this.printError();
                break;
        }
        this.clear();
    }

    addDot(){
        if(this.mainInput.indexOf('.') == -1) {
            this.addCharToInput('.');
        }
    }

    addPercentage(){
        try{
            let n1 = parseFloat(this.numberOne);
            if(isNaN(n1)){
                throw e;
            }
            else{
                let pcnt = eval(`${parseFloat(this.numberOne)} * (${parseFloat(this.mainInput)} / 100)`);
                this.mainInput = pcnt;
            }

        }
        catch{
            this.printError();
        }
    }

    togglePosNegNumber(){
        if(this.mainInput.indexOf('-') == -1){
            this.mainInput = "-" + this.mainInput;
        }
        else{
            this.mainInput = this.getNumericInput();
        }
    }

    calcSquareRoot(){
        let n = parseFloat(this.mainInput);
        this.mainInput = Math.sqrt(n);
        this.resizeDisplay();
    }

    calcSquareNumber(){
        let n = parseFloat(this.mainInput);
        this.mainInput = eval(`${n} * ${n}`);
        this.resizeDisplay();
    }

    calcFraction(){
        this.numberOne = 1;
        this.operator = '/';
    }

    calculate(){
        try{

            if(!this.numberOne || !this.operator){
                throw e;
            }

            let n1 = parseFloat(this.numberOne);
            let n2 = parseFloat(this.mainInput);

            let result = eval(`${n1}${this.operator}${n2}`);

            this.mainInput = result;
            
            this.resizeDisplay();

        }
        catch(e){
            this.printError();
            return;
        }
    }

    resizeDisplay(){
        if(this.mainInput.length > 13){
            this._mainInputDisplay.style.fontSize = "30px";
        }
        else{
            this._mainInputDisplay.style.fontSize = "40px";
        }
    }

    clearAll(){
        this.numberOne = "";
        this.operator = "";
        this.clear();
        this.resizeDisplay();
    }

    clear(){
        this.mainInput = "0";
        this.resizeDisplay();
    }

    erase(){
        if(this.mainInput.length > 1){
            if(this.mainInput.length < 14){
                this.resizeDisplay();
            }
            this.mainInput = this.mainInput.slice(0, -1);
        }
        else{
            this.clear();
        }
    }
}