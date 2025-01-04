// internal
// const radius = parseFloat(prompt("Nhap vao ban kinh hinh tron: "));
// if (radius >= 0) { // if thiếu (Nếu không có else)
//   const area = radius * radius * Math.PI;
//   document.write(area.toFixed(2));
// } else { // if-else (if đủ)
//   alert('Vui long nhap mot so nguyen duong');
// }

// const number = parseInt(prompt("Vui long nhap vao mot so"));
// const isEven = number % 2 === 0;
// console.log(isEven);
// if (isEven) {
//   alert("Day la so chan");
// } else {
//   alert("Day la so le");
// }
// const a = parseInt(prompt("Nhap vao so a: "));
// const b = parseInt(prompt("Nhap vao so b: "));
// const c = parseInt(prompt("Nhap vao so c: "));
// // if long nhau (nested if)
// if (a > b) {
//   if (a > c) {
//     console.log("a la so lon nhat");
//   } else {
//     console.log("c la so lon nhat");
//   }
// } else {
//   if (b > c) {
//     console.log("b la so lon nhat");
//   } else {
//     console.log("c la so lon nhat");
//   }
// }
const scoreElement = document.getElementById("score"); // global-scope
function calculate(e) {
  e.preventDefault(); // ngăn hành vi mặc định submit form lên server
  const score = scoreElement.value;
  if (score >= 90) {
    console.log("A");
  } else if (score >= 80) {
    console.log("B");
  } else if (score >= 70) {
    console.log("C");
  } else if (score >= 60) {
    console.log("D");
  } else {
    console.log("F");
  }
}

function onLoad() {
  scoreElement.value = 101;
}

function handleChange() {
  console.log("Nguoi dung vua bam vao");
}

function handleKeydown() {
  console.log("Nguoi dung bam phim");
}

function handleMouseOver() {
  document.getElementById("heading").style.color = "red";
}

function handleMouseOut() {
  document.getElementById("heading").style.color = "black";
}

// const currentDay = new Date().getDay();
// console.log(currentDay);
// condition => (1+1)
// if (currentDay === 0) {
//   console.log('Sun');
// } else if (currentDay === 1) {
//   console.log('Mon');
// } else if (currentDay === 2) {
//   console.log('Tue');
// } else if (currentDay === 3) {
//   console.log('Wed');
// } else if (currentDay === 4) {
//   console.log('Thu')
// } else if (currentDay === 5) {
//   console.log('Fri');
// } else {
//   console.log('Sar');
// }
// const SUNDAY = 0; // magic number
// const MONDAY = 1;
// const TUESDAY = 2;
// switch (currentDay) {
//   case SUNDAY: // number
//     console.log('Sun');
//     break;
//   case MONDAY:
//     console.log('Mon');
//     break;
//   case TUESDAY:
//     console.log('Tue');
//     break;
//   case 3:
//     console.log('Wed');
//     break;
//   case 4:
//     console.log('Thu')
//     break;
//   case 5:
//     console.log('Fri');
//     break;
//   default:
//     console.log('Sar');
// }
// toán tử so sánh: >, >=, <, <=, == (so sánh giá trị), === (so sánh giá trị và kiểu dữ liệu)

// const age = 29;
// const isAdult = age > 18 ? 'Tôi đủ tuổi' : 'Tôi chưa đủ tuổi';
// console.log(isAdult);
// if (age > 18) {
//   console.log('Tôi đủ tuổi');
// } else {
//   console.log('Tôi chưa đủ tuổi');
// }

// const demoElement = document.getElementById("demo");
// console.log(demoElement);
// demoElement.innerText = "<strong>Hello World!</strong>";

//var - phạm vi hàm (function-scope), hay là phạm vi global-scope,
// var - có thể khai báo lại
// hoisting: đưa những khai báo lên đầu phạm vi
// var x = 10;
// var y = 20;
// var z = x + y;
// // console.log(z);
// function viduvar() {
//   // function-scope
//   for (var i = 0; i < 3; i++) {
//     // TODO: in ra i
//   }
//   if (true) {
//     var fullName = "Wanbi";
//   }
//   console.log(i);
//   console.log(fullName);
// }
// viduvar();
// // console.log(lastName);
// // var x = 20;
// // console.log(x);
// // console.log(fullName); // null, undefined: Lỗi fullname chưa được khai báo

// // let:
// let apple = "Apple";
// console.log(apple);
// function vidulet() {
//   for (let i = 0; i < 3; i++) {
//     // TODO: in ra i
//     console.log(i);
//   }
//   if (true) {
//     let fullName = "Wanbi";
//     console.log(fullName);
//   }
// }

// vidulet();
// const PI = 3.1459;
// console.log(PI);

const result = (10 + 5) * 2;
console.log(result);
const a = 10;
const b = 20;
const c = 5;
// toán tử logic < toán tử so sánh < toán tử số học
if (a < b || a > c) {
  console.log('a nhỏ hơn b');
}