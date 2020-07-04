const WaitingQueue = require('./WaitingQueue')
const Barista = require('./Barista');

class Manager {
    constructor(cafeEmitter) {
        this.cafeEmitter = cafeEmitter;
        this.barista = new Barista(cafeEmitter);
        this.waitingQueue = new WaitingQueue(cafeEmitter);
    }    
    
    start(){
        const self = this;
        this.barista.start();
        this.waitingQueue.start();
        setInterval(() => self.assignTasks(), 1000);
        this.cafeEmitter.on('음료 제작 시작', (task) => self.updateDashBoard(task, '제작중'));
        this.cafeEmitter.on('음료 제작 완료', (task) => self.updateDashBoard(task, '완료'));
    }

    assignTasks() {
        while(1){
            const task = this.waitingQueue.front();
            if(!task || !this.barista.isAvailable())break;
            this.waitingQueue.pop();
            this.cafeEmitter.emit('음료 제작 요청', task);
        }
    }

    updateDashBoard(task, status) {
        this.cafeEmitter.emit('현황판 업데이트', task, status);
    }
    
}

module.exports = Manager;