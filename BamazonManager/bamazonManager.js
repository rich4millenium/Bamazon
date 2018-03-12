var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Raphael@2014",
    database: "bamazon"
});

connection.connect();


inquirer.
    prompt([
        {
            type: "list",
            name: "products",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }

    ]).then(function (answer) {
        if (answer.products === "View Products for Sale") {
            loadProducts();
            connection.end();
        } else if (answer.products === "View Low Inventory") {
            lowInventory();
            connection.end();
        } else {
            console.log("hello");
            connection.end();
        }
    })

function loadProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var lowItems = [];
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                lowItems.push(res[i]);
            }
        }
        if (lowItems.length > 0) {
            console.log("\nBelow is a list of the products that have a low inventory: \n");
            console.table(lowItems);
        } else {
            console.log("There are currently no products that are low on inventory.");
        }
    });
}