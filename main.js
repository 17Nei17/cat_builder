class pageControl {
    constructor(element) {
        this.element = element;
        this.fileInput = element.querySelectorAll(".fileInput");
        this.colorPickers = element.querySelectorAll(".colorPicker");
        this.inputsImage = element.querySelectorAll(".imageInput");
        this.cleanButton = element.querySelectorAll(".cleanButton");
        this.rangeInput = element.querySelectorAll(".rangeInput");
        this.buttonInput = element.querySelectorAll(".buttonInput");
        this.init();

    }


    init() {
        this.buttonInput.forEach(input => {
            input.addEventListener("change", (event) => this.addButtonImage(event, this), false);
        });
        this.fileInput.forEach(input => {
            input.addEventListener("change", (event) => this.changeFile(event, this), false);
        });
        this.colorPickers.forEach(picker => {
            picker.addEventListener("input", (event) => this.changeColor(event, this), false);
        });
        this.inputsImage.forEach(input => {
            input.addEventListener("change", (event) => this.setImage(event, this), false);
        });
        this.cleanButton.forEach(button => {
            button.addEventListener("click", (event) => this.cleanImage(event, this), false);
        });
        this.rangeInput.forEach(button => {
            button.addEventListener("change", (event) => this.setOpacity(event, this), false);
        });
        this.rangeInput.forEach(button => {
            button.addEventListener("input", (event) => this.setOpacity(event, this), false);
        });
    }

    addButtonImage(event) {
        let f = event.target.files[0];
        if (f) {
            let src = URL.createObjectURL(f);
            let targetItem = event.target.dataset.targetItem;
            document.querySelector('#' + targetItem + '').src = src;
        }
    }

    changeFile(event) {
        let f = event.target.files[0];
        if (f) {
            let src = URL.createObjectURL(f);
            let targetItem = event.target.dataset.targetItem;
            if (event.target.dataset.branch) {
                if (event.target.dataset.branch === "left") {
                    if (document.querySelector('#' + targetItem + '').style.background.length > 0) {
                        document.querySelector('#' + targetItem + '').style.background += ",url(" + src + ") repeat-y left top";
                        return;
                    } else {
                        document.querySelector('#' + targetItem + '').style.background = "url(" + src + ") repeat-y left top";
                        return;
                    }

                }
                if (event.target.dataset.branch === "right") {
                    if (document.querySelector('#' + targetItem + '').style.background.length > 0) {
                        document.querySelector('#' + targetItem + '').style.background += ",url(" + src + ") repeat-y right top";
                        return;
                    } else {
                        document.querySelector('#' + targetItem + '').style.background = "url(" + src + ") repeat-y right top";
                        return;
                    }

                }
            }
            document.querySelectorAll('#' + event.target.dataset.targetItem + '').forEach(targetItem => {
                targetItem.style.backgroundImage = "url(" + src + ")";
            });
        }

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
        if (event.target.dataset.exportValue) {
            document.querySelector('#' + event.target.dataset.exportValue + '').textContent = event.target.value;
        }
    }
    changeColor(event) {
        if (event.target.dataset.cssAttr === 'hover') {
            document.querySelectorAll('#' + event.target.dataset.targetItem + '').forEach(targetItem => {
                if (document.querySelector('#hoverStyle')) {
                    document.querySelector('#hoverStyle').remove();
                }
                var css = 'a:hover{color:' + event.target.value + ' !important}';
                var style = document.createElement('style');
                style.id = "hoverStyle";
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                document.getElementsByTagName('head')[0].appendChild(style);

            });
        }
        if (event.target.dataset.exportValue) {
            document.querySelector('#' + event.target.dataset.exportValue + '').textContent = event.target.value;
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
        document.querySelector('#' + event.target.dataset.targetItem + '').src = "";
        document.querySelector('input[type=file]').value = ''
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