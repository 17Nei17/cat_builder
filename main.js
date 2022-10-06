// colorPicker.addEventListener("input", watchColorPicker, false);
// colorPicker.addEventListener("change", watchColorPicker, false);

class pageControl {
    constructor(element) {
        this.element = element;
        this.colorPickers = element.querySelectorAll(".colorPicker");
        this.init();
    }


    init() {
        this.colorPickers.forEach(picker => {
            picker.addEventListener("input", this.changeColor, false);
        });
    }

    changeColor(event) {
        console.log(event.target.dataset.targetItem.split(','));
        event.target.dataset.targetItem.split(',').forEach(dataItem => {
            let cssAttr = event.target.dataset.cssAttr;
            document.querySelector('#' + dataItem + '').style = cssAttr+ ":" +event.target.value; 
        });
    }

}
new pageControl(document.querySelector("#body"));