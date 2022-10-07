class pageControl {
    constructor(element) {
        this.element = element;
        this.colorPickers = element.querySelectorAll(".colorPicker");
        this.inputsImage = element.querySelectorAll(".imageInput");
        this.cleanButton = element.querySelectorAll(".cleanButton");
        this.rangeInput = element.querySelectorAll(".rangeInput");
        this.init();

    }

    init() {
        this.colorPickers.forEach(picker => {
            picker.addEventListener("input", this.changeColor, false);
        });
        this.inputsImage.forEach(input => {
            input.addEventListener("change", this.setImage, false);
        });
        this.cleanButton.forEach(button => {
            button.addEventListener("click", this.cleanImage, false);
        });
        this.rangeInput.forEach(button => {
            button.addEventListener("change", this.setOpacity, false);
        });
    }

    setOpacity(event) {
        event.target.dataset.targetItem.split(',').forEach(input => {
            if (document.querySelector('#' + input + '').style.backgroundColor.indexOf("rgba") === -1) {
                document.querySelector('#' + input + '').style.backgroundColor = document.querySelector('#' + input + '').style.backgroundColor.replace(')', ', ' + event.target.value + ')').replace('rgb', 'rgba');
            } else {
                let newColor = document.querySelector('#' + input + '').style.backgroundColor.split(",");
                newColor[3] = event.target.value + ")";
                document.querySelector('#' + input + '').style.backgroundColor = newColor.join();
            }

        });
    }

    changeColor(event) {
        if(event.target.dataset.cssAttr === 'hover'){
            document.querySelectorAll('#' + event.target.dataset.targetItem + '').forEach(targetItem => {
                let x = 'h1:hover{color:'+event.target.value+'}';
                document.styleSheets[0].deleteRule(3);
                document.styleSheets[0].insertRule('a:hover{color:red !important}', 3); 
                
            });
            
        }
        event.target.dataset.targetItem.split(',').forEach(dataItem => {
            document.querySelectorAll('#' + dataItem + '').forEach(targetItem => {
                targetItem.style[event.target.dataset.cssAttr] = event.target.value;
            });
        });
    }
    cleanImage(event) {
        event.target.dataset.targetInputs.split(',').forEach(input => {
            document.querySelector('#' + input + '').value = '';
        });
        document.querySelector('#' + event.target.dataset.targetItem + '').style = "";
    }

    setImage(event) {
        let targetItem = event.target.dataset.targetItem;
        if (event.target.dataset.branch) {
            if (event.target.dataset.branch === "left") {
                if (document.querySelector('#' + targetItem + '').style.background.length > 0) {
                    document.querySelector('#' + targetItem + '').style.background += ",url(" + event.target.value + ") repeat-y left top";
                    return;
                } else {
                    document.querySelector('#' + targetItem + '').style.background = "url(" + event.target.value + ") repeat-y left top";
                    return;
                }

            }
            if (event.target.dataset.branch === "right") {
                if (document.querySelector('#' + targetItem + '').style.background.length > 0) {
                    document.querySelector('#' + targetItem + '').style.background += ",url(" + event.target.value + ") repeat-y right top";
                    return;
                } else {
                    document.querySelector('#' + targetItem + '').style.background = "url(" + event.target.value + ") repeat-y right top";
                    return;
                }

            }
        }
        document.querySelectorAll('#' + event.target.dataset.targetItem + '').forEach(targetItem => {
            targetItem.style.backgroundImage = "url(" + event.target.value + ")";
        });
    }

}
new pageControl(document.querySelector("#body"));