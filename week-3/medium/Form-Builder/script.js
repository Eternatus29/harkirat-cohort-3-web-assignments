function addComponent() {
    const type = document.getElementById("type-selector").value;
    const label = document.getElementById("set-label").value;

    document.getElementById("form-preview").innerHTML += `<label>${label}</label><input type=${type} />`
}