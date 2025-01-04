// const cities = [
//     ["HN", "SG", "DN"],
//     ["Tokyo", "New york"],
//     ["Bangkok"]
// ]
//
// console.log(typeof cities)
// console.log(Array.isArray(cities))
//
// for (let i = 0; i < cities.length; i++) {
//     for (let j = 0; j < cities[i].length; j++) {
//         console.log(cities[i][j])
//     }
// }

const numbers = new Array(5)
for (let i = 0; i < numbers.length; i++) {
    numbers[i] = new Array(5).fill()
}

for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        numbers[i][j] = Math.floor(Math.random() * 100) + 1
        row += `<td>$numbers[i][j]</td>`
    }
    row += `</tr>`
}
console.log(numbers)