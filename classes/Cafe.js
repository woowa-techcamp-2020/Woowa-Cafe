const Cashier = require('./Cashier');
const Manager = require('./Manager');
const DashBoard = require('./DashBoard');
const EventEmitter = require('events');

class Cafe {
    cafeEmitter = new EventEmitter();
    cashier = new Cashier(this.cafeEmitter);
    manager = new Manager(this.cafeEmitter);
    dashBoard = new DashBoard(this.cafeEmitter);
    
    constructor(name) {
        this.name = name;
    }

    open() {
        console.log(`${this.name} 카페가 문을 열었습니다!`);
        this.cashier.start();
        this.manager.start();
        this.dashBoard.start();
    }
}

module.exports = Cafe;