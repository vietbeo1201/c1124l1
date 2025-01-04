
function convertCurrentcy(){

    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);


    if (fromCurrency === toCurrency) {
        result = amount;
    } if (fromCurrency == "US" && toCurrency == "VN") {
        result = amount * 23000;
    } if (fromCurrency == "UK" && toCurrency == "VN") {
        result = amount * 24000;
    } if (fromCurrency == "VN" && toCurrency == "US") {
        result = amount * 0.000031;
    } if (fromCurrency == "UK" && toCurrency == "US") {
        result = amount * 1.26;
    } if (fromCurrency == "VN" && toCurrency == "UK") {
        result = amount * 0.000039;
    } if (fromCurrency == "US" && toCurrency == "UK") {
        result = amount * 0.79;
    }
    document.getElementById("result").innerText = result;
}
