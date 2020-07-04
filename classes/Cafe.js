const Barista = require('./Barista');
const Cashier = require('./Cashier');
const WaitingQueue = require('./WaitingQueue')
const Manager = require('./Manager');
const DashBoard = require('./DashBoard');
const EventEmitter = require('events');

class Cafe {
    cafeEmitter = new EventEmitter();
    cashier = new Cashier(this.cafeEmitter);
    waitingQueue = new WaitingQueue(this.cafeEmitter);
    barista = new Barista(this.cafeEmitter);
    manager = new Manager(this.cafeEmitter, this.waitingQueue, this.barista);

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
        this.barista.start();
        this.waitingQueue.start();
        this.manager.start();
    }
}

module.exports = Cafe;