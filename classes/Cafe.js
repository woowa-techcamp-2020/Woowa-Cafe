const Barista = require('./Barista');
const Cashier = require('./Cashier');
const Manager = require('./Manager');
const DashBoard = require('./DashBoard');

class Cafe {
    cashier = new Cashier();
    manager = new Manager();
    barista = new Barista();
    dashBoard = new DashBoard();

    constructor(name) {
        this.name = name;
        process.on('exit', function() {
            console.log(`${name} 카페가 문을 닫았습니다!`);
        });
    }

    open() {
        console.log(`${this.name} 카페가 문을 열었습니다!`);
        this.cashier.start();
    }
}

module.exports = Cafe;