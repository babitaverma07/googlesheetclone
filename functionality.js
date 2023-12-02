
let activeCellId = null;
const activeCellElement = document.getElementById("active-cell");

const form = document.querySelector(".form");
const state = {};

form.addEventListener("change", onChangeFormData);


const defaultStyles = {
    fontFamily: "font-family: 'Poppins', sans-serif;",
    fontSize: 16,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    align: "left",
    textColor: "#000000",
    bgColor: "#ffffff",
}

function onChangeCellText(event) {
    let changedText = event.target.innerText;
    if (state[activeCellId]) {

        state[activeCellId].text = changedText;
    }
    else {
        state[activeCellId] = { ...defaultStyles, text: changedText };
    }
}

function onChangeFormData() {
    const options = {
        fontFamily: form["fontFamily"].value,
        fontSize: form["fontSize"].value,
        isBold: form["isBold"].checked,
        isItalic: form["isItalic"].checked,
        isUnderline: form.isUnderline.checked,
        align: form.align.value, 
        textColor: form["textColor"].value,
        bgColor: form["bgColor"].value,
    };
    applyStyles(options);
}

function applyStyles(styles) {
         if (!activeCellId) {
        form.reset();
        alert("Please select cell to apply");
        return;
    }
    const activeCell = document.getElementById(activeCellId);
    activeCell.style.color = styles.textColor;
    activeCell.style.backgroundColor = styles.bgColor;
    activeCell.style.textAlign = styles.align;
    activeCell.style.fontWeight = styles.isBold ? "600" : "400";
    activeCell.style.fontFamily = styles.fontFamily;
    activeCell.style.fontSize = styles.fontSize + "px";
    activeCell.style.textDecoration = styles.isUnderline ? "underline" : "none";
    activeCell.style.fontStyle = styles.isItalic ? "italic" : "normal";

    state[activeCellId] = { ...styles, text: activeCell.innerText };
}

function onFocusCell(event) {
    if (activeCellId === event.target.id) return;
    activeCellId = event.target.id;
    activeCellElement.innerText = activeCellId;

 
    if (state[activeCellId]) {
        resetForm(state[activeCellId])
    }
    else {
        resetForm(defaultStyles);
    }
}

function resetForm(styles) {


    form.fontSize.value = styles.fontSize;
    form.fontFamily.value = styles.fontFamily;
    form.isBold.checked = styles.isBold;
    form.isItalic.checked = styles.isItalic;
    form.isUnderline.checked = styles.isUnderline;
    form.align.value = styles.align;
    form.textColor.value = styles.textColor;
    form.bgColor.value = styles.bgColor;
}


function exportData() {
    const jsonData = JSON.stringify(state);
    const blob = new Blob([jsonData], { type: "text/plain" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "data.json";
    link.href = url;
    link.click();
}
