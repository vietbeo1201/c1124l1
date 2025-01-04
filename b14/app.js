// Ví dụ sử dụng Array Literals
// const cities = [
//     ['HN', "SG", "DN"],
//     ["Tokyo", "New York"],
//     ["Bangkok"]
// ];
// console.log(Array.isArray(cities[0]));
// console.log(Array.isArray(cities[1]));
// console.log(Array.isArray(cities[2]));
// console.log(cities);
//
// for (let i = 0; i < cities.length; i++) {
//     for (let j = 0; j < cities[i].length; j++) {
//         console.log(cities[i][j]);
//     }
// }
// Sử dụng từ khóa new
const numbers = new Array(5);
for (let i = 0; i < numbers.length; i++) {
    numbers[i] = new Array(5);
}
const table = document.getElementById("table");
let row = '';
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
    row += '<tr>';
    for (let j = 0; j < numbers[i].length; j++) {
        numbers[i][j] = Math.floor(Math.random() * 100) + 1;
        numbers[2][2] = 101;
        sum += numbers[i][j];
        const oldColor = 'red';
        const evenColor = 'orange';
        row += `<td style="${(numbers[i][j] % 2 === 0) ? `background: ${evenColor}; color: white` : `background: ${oldColor}; color: white`}">${numbers[i][j]}</td>`;
    }
    row += '</tr>';
}
table.innerHTML = row;
document.getElementById("kq").innerHTML = 'Tổng số tất cả phần tử trong mảng: ' + sum;
console.log(numbers);
