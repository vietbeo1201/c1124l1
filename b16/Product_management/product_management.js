products = []
products.push("product 1");
products.push("product 2");
products.push("product 3");
products.push("product 4");
products.push("product 5");
products.push("product 6");
products.push("product 7");
products.push("product 8");
products.push("product 9");

function displayproduct(){
    let tabledata =  ``;
    for (let i = 0; i < products.length; i++){
        tabledata +=
            `<tr>
                <td>${products[i]}</td>
                <td><button>edit</button></td>
                <td><button>delete</button></td>
            </tr>`;
    }
    document.getElementById("table").innerHTML = tabledata;
}

displayproduct();