let mysql = require("mysql")
let inquirer = require("inquirer")
let keys = require('./keys.js')

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys,
    database: "amazon_db"

})

function displayInventory() {
    connection.query(
        "SELECT * from products", function (err, res) {
            if (err) throw err;
            console.table(res)
            console.log("\n^^^^^^^^^^^^^^^^ Look at your inventory above! ^^^^^^^^^^^^^^^^ \n")
            managerPrompt();
        }
    )
}

function addProduct() {
    inquirer.prompt(
        [
            {
                message: "What is the product you would like to add?",
                name: "productname",
                type: "input"
            },
            {
                message: "What department does this product belong to?",
                name: "departmentname",
                type: "input"

            },
            {
                message: "What is the price of the product?",
                name: "productprice",
                type: "input",
                validate: function (value) {
                    if (isNaN(value)) {
                        console.log(`\nPlease enter a valid number!`)
                        return false;
                    }

                    return true;
                }
            },

            {
                message: "What is the quantity of the product?",
                name: "productquantity",
                type: "input",
                validate: function (value) {
                    if (isNaN(value)) {
                        console.log(`\nPlease enter a valid number!`)
                        return false;
                    }

                    return true;
                }
            }
        ]).then(function (answer) {
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: answer.productname,
                    department_name: answer.departmentname,
                    price: answer.productprice,
                    stock_quantity: answer.productquantity
                }, function (err, res) {
                    if (err) throw err;
                    console.log(`\n You have successfully added ${answer.productquantity} ${answer.productname} in the ${answer.departmentname} department priced at $${answer.productprice}!\n`);
                    setTimeout(managerPrompt, 6000);
                }
            )
        })

}

function addToInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer.prompt(
            [
                {
                    message: "What product ID are you increasing inventory for?",
                    type: "input",
                    name: "pid",
                    validate: function (value) {

                        for (let i = 0; i < res.length; i++) {
                            if (value == res[i].item_id) {

                                return true;
                            }
                        }
                        console.log(`\nPlease enter a valid id`)
                        return false;

                    }
                },
                {
                    message: `What is the quantity you are increasing by?`,
                    type: "input",
                    name: "pq",
                    validate: function (value) {
                        if (isNaN(value) || (value < 1)) {
                            console.log("Input a valid quantity")
                            return false;

                        }
                        
                        return true;
                    }
                }
            ]
        ).then(function(answer) {
        
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: res[answer.pid-1].stock_quantity + parseInt(answer.pq)
                    },
                    {
                        item_id: answer.pid
                    }
                ],function (err, res) {
                    if (err) throw err;
                    console.log(`\n You have updated the product with an ID of : ${answer.pid} by adding an additional ${answer.pq} units!`);

                    managerPrompt()
                }
            )

        })
    }
    )
}

function viewLowInventory(){
    connection.query(`SELECT * FROM PRODUCTS WHERE ?? <5`,"stock_quantity",function(err,res){
        if (err) throw err;
        console.table(res)
        console.log(`\n Above are the items where inventory is less than 5!`)
        console.log(`\n Consider adding more using the Add_To_Inventory feature!\n`)
        managerPrompt();
    })
}


function managerPrompt() {
    inquirer.prompt({
        message: "Hello Manager, What action would you like to perform?",
        name: "action",
        type: "list",
        choices: ["View_Inventory", "View_Low_Inventory", "Add_To_Inventory", "Add_New_Product", "EXIT"]
    }).then(function (answer) {
        if (answer.action === "View_Inventory") {
            displayInventory();
        } else if (answer.action === "View_Low_Inventory") {
            viewLowInventory();
        } else if (answer.action === "Add_To_Inventory") {
            addToInventory();
        } else if (answer.action === "Add_New_Product") {
            addProduct();
        } else if (answer.action === "EXIT") {
            console.log("Thank you and have a great day!")
            connection.end();
        }
    })
}



connection.connect(function (err) {
    if (err) throw err;
    console.log(connection.threadId)
    managerPrompt();
})

