
function Calculate() {

    const calculatein = document.getElementById("calculate").value;
    const SoThu1 = parseFloat(document.getElementById("SoThu1").value);
    const SoThu2 = parseFloat(document.getElementById("SoThu2").value);


    if ( calculatein === "chia" && SoThu2 == 0 ) {
        result = "Số chia không hợp lệ (không thể chia cho 0)";
        document.getElementById("result").innerText = result;
        return;
    }
    if ( calculatein === "cong" ) {
        result = SoThu1 + SoThu2;
    }
    if (calculatein === "tru") {
        result = SoThu1 - SoThu2;
    }
    if (calculatein === "chia") {
        result = SoThu1 / SoThu2;
    }
    if (calculatein === "nhan") {
        result = SoThu1 * SoThu2;
    }
    document.getElementById("result").innerText = result;

}
