document.getElementById("ice-cream-form").onsubmit = () => {

    let isValid = true;
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let flavor = document.getElementById("flavor");
    let waffle = document.getElementById('waffle');
    let sugar = document.getElementById('sugar');
    let cup = document.getElementById('cup')

    console.log(flavor.value)
    if (!name) {
        isValid = false;
        document.getElementById('err-name').style.display = "block";
    }
    if (!email) {
        isValid = false;
        document.getElementById('err-email').style.display = "block";
    }
    if (flavor.value==='none') {
        console.log("flavor is false")
        isValid = false;
        document.getElementById('err-flav').style.display = "block";
    }
    if (!waffle.checked && !sugar.checked && !cup.checked){
        document.getElementById('err-cone').style.display = "block";

    }
        return isValid;
}
