// const isEven = false;
// if (isEven) {
//   console.log('Even is true');
// }
// let i = 10, j = 12, k = 11;
// if (i > j)
//   if (i > k) console.log("A");
//   else console.log("B");

// var x = 1.0 - 0.1 - 0.1 - 0.1 - 0.1 - 0.1;
// console.log(x == 0.5);
// console.log(x);

// const EPSILON = 1e-14;
// var x = 1.0 - 0.1 - 0.1 - 0.1 - 0.1 - 0.1;
// if (Math.abs(x - 0.5) < EPSILON) console.log(x + " is approximately 0.5");
// const number = 10;
// console.log(number % 2);
// if (number % 2 == 0) {
//   console.log(number + " is even");
// } else {
//   console.log(number + " is odd");
// }
// const isEven = number % 2 == 0;
// console.log(isEven ? number + " is even" : number + " is odd"); // Toan tu 3 ngoi (Ternary Operator)
// const inState = true;
// if (inState) {
//   tuition = 5000;
// } else {
//   tuition = 15000;
// }
// alert("The tuition is " + tuition);
// document.write("The tuition is " + tuition);
let value = prompt("Type a number", 0);
const result = value > 0;
switch (result) {
  case true:
    alert(1);
    break;
  case false:
    switch (value) {
      case "0":
        alert(0);
        break;
      default:
        alert(-1);
    }
    break;
}
