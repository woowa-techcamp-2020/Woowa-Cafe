const readline = require('readline');
const Menu = require('./Menu');

class Cashier {
    orderCount = 0;
    drinkCount = 0;
    constructor(cafeEmitter){
        this.cafeEmitter = cafeEmitter;
    }

    createTasks (nickname, input) {
        if(!nickname || !input) return;

        const args = input.split(':');

        const drinkId = parseInt(args[0]); 
        const count = parseInt(args[1]);
        if(!drinkId || !count) return;

        const drink = Menu.find(drink => drink.id === drinkId);
        if(!drink) return;

        const tasks = [];
        const orderId = ++this.orderCount;
        for(let i = 0; i < count; i++){
            tasks.push({
                id : ++this.drinkCount,
                nickname,
                orderId,
                drink,
            });
        }
        return tasks;
    }

    createTasksFromInput (args) {
        const tasks =  this.createTasks(args[0], args[2]);
        if(tasks) this.cafeEmitter.emit('주문 추가', tasks); 
        else this.inputErrorHandler();
    }

    showDashBoard (args) {
        const nickname = args[0];
        if(nickname) this.cafeEmitter.emit('현황판 보기', nickname); 
    }

    listenToOrders() {
        const self = this;
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on('line', function (input) {
            const args = input.split(' ');
            switch(args[1]) {
                case '주문': 
                    self.createTasksFromInput(args);
                    break;
                case '현황판':
                    self.showDashBoard(args);
                    break;
                default:
                    self.inputErrorHandler();
            }
        })
        .on('close', function () {
            process.exit();
        });
    }
    
    inputErrorHandler() {
        console.log('==================================================================');
        console.log('주문 입력을 확인해주세요!');
        this.printMenu();
    }

    start() {
        this.listenToOrders();
        this.printMenu();
    }

    printMenu() {
        const MenuMsg = Menu.reduce((a, b) => a + `${b.id}. ${b.name}(${b.neededTime}s)\n`, '[메뉴판]\n');
        const HowtoMsg = '주문을 하려면 다음과 같이 입력하세요. 예) 크롱님 아메리카노 2개 => 크롱 주문 1:2\n현황판을 보려면 다음과 같이 입력하세요. 예) 크롱 현황판';
        console.log(MenuMsg);
        console.log(HowtoMsg);
    }
}

module.exports = Cashier;