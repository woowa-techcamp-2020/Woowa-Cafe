const readline = require('readline');
const Menu = require('./Menu');

class Cashier {
    orderCount = 0;

    constructor(cafeEmitter){
        console.log(cafeEmitter);
        this.cafeEmitter = cafeEmitter;
    }

    getOrderDrinks (input) {
        if(!input) return;

        const args = input.split(':');

        const drinkId = parseInt(args[0]); 
        const count = parseInt(args[1]);
        if(!drinkId || !count) return;

        const drink = Menu.find(drink => drink.id === drinkId);
        if(!drink) return;

        const drinks = [];
        for(let i = 0; i < count; i++)drinks.push(drink);

        return drinks;
    }

    getOrderFromInput (input) {
        const args = input.split(' ');
        const nickname = args[0];
        const drinks = this.getOrderDrinks(args[1]);

        if(!nickname || !drinks) return;

        return ({
            id : ++ this.orderCount,
            nickname : nickname,
            drinks : drinks,
        });
    }

    listenToOrders() {
        const self = this;
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on('line', function (input) {
            const order = self.getOrderFromInput(input);
            self.cafeEmitter.emit('주문 추가', order); 
        })
        .on('close', function () {
            process.exit();
        });
    }

    start() {
        this.listenToOrders();
        this.printMenu();
    }
    printMenu() {
        const MenuMsg = Menu.reduce((a, b) => a + `${b.id}. ${b.name}(${b.neededTime}s)    `, '메뉴 =  ');
        const HowtoMsg = '닉네임과 함께 주문할 음료를 입력하세요. 예) 크롱님 아메리카노 2개 => 크롱 1:2'
        console.log(MenuMsg);
        console.log(HowtoMsg);
    }
}

module.exports = Cashier;