# Amazon-Store-Front
An Amazon-like storefront using the CLI, MYSQL &amp; Node.js.

## Table of Contents 

## Objective 

The objective was to utilize MySQL & Node.js to create a dynamic storefront that updates the database based on the commands from the CLI.  The customer component can view inventory and select an item.  The manager component can display inventory, add new products, add quantity to existing products, and display low inventory.

## Code Structure

The app is broken down into three files. A file that holds my schema and values for the MySQL database, a file that runs the client-side portion of the application, and a file that runs the manager-side of the application.  The code is structured where each command made will trigger a specific function.  I also incorporated queries when utilizing the inquirer package to increase validation & added timeouts so the user has time to see recaps from their actions.

### Technologies
Back-End
- [ ] Node.js
- [ ] NPM Packages
- [ ] MySQL

### Video Demo
[![Amazon-Store-Front Demo](https://img.youtube.com/vi/9y51AoNSMfk/0.jpg)](https://youtu.be/9y51AoNSMfk)
Correct video coming soon!

### Setup 
```
1. git clone https://github.com/FredsGitHubAccount/Amazon-Store-Front.git
2. cd Amazon-Store-Front in your terminal
3. npm install 
4a. node amazonCustomer.js
4b. node amazonManager.js

```

### Requirements

1. A MySQL database
