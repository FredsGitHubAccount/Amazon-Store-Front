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

function displayProducts() {
    connection.query(
        "SELECT * FROM products",
        function (err, response) {
            if (err) throw err;
            console.table(response)
            console.log("\n^^^^^^^^^^^^^^^^ Look at our inventory above! ^^^^^^^^^^^^^^^^ \n")
            customerPrompt();
        })


}

function customerPrompt() {
    inquirer.prompt({

        name: "shop",
        type: "list",
        message: "Welcome to Amazon! Would you like to shop with us today? Our inventory is posted above!",
        choices: ["YES", "NO"]

    }).then(function (answer) {
        if (answer.shop === "YES") {
            startShopping();
        }
        else {
            console.log(`\nHave a great day & hope to see you soon!\n`)
            connection.end();
        }
    })
}

function startShopping() {

    connection.query(
        "SELECT * FROM products", function (err, res) {
            if (err) throw err;

            inquirer.prompt([
                {
                    name: "itemnumber",
                    type: "input",
                    message: "What is the ID of the item you would like to buy?",
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
                    
                    name: "itemammount",
                    type: "input",
                    message: "How many items of this quantity do you wish to purchase?",
                    validate: function (value) {
                        if (isNaN(value) || (value<1)) {
                            console.log(`\nPlease enter a valid number!`)
                            return false;
                        }

                        return true;
                    }
                }


            ]).then(function (answer) {

                let itemIdentity = answer.itemnumber;
                let itemQuantity = answer.itemammount;

                console.log(`\n You have requested an order for item ${itemIdentity}, with the quantity of ${itemQuantity}`)
                updateInventory(itemIdentity, itemQuantity)

            })

        }
    )

}

function updateInventory(prodId, quantId) {
    connection.query(
        "SELECT ?? FROM products WHERE ?",
        [
            [
                "stock_quantity"
            ],
            {
                item_id: prodId
            }
        ],

        function (err, res) {
            if (err) return err;
            if (quantId > res[0].stock_quantity) {
                console.log("\n Insufficient quantity, please try again with what we have in stock!")
                console.log("\n We will return you to the main menu shortly!\n")
                setTimeout(displayProducts, 4000)
            }
            else {
                connection.query(
                    "UPDATE products SET ? Where ?",
                    [
                        {
                            stock_quantity: res[0].stock_quantity - quantId
                        },
                        {
                            item_id: prodId
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        connection.query("SELECT price FROM products WHERE ?", { item_id: prodId }, function (err, res) {
                            if (err) return err;
                            console.log(`\n Your grand total is $${quantId * res[0].price}`)
                            console.log("\n Thank you for your purchase!")
                            console.log(`\n We will soon prompt you if you would like to continue shopping!`)
                            setTimeout(displayProducts, 4000)
                        })
                    }
                )
            }
        }
    )
}


connection.connect(function (err) {
    if (err) throw err;

    displayProducts();
});