class Barista {
    taskCount = 0;

    constructor(cafeEmitter){
        this.cafeEmitter = cafeEmitter;
    }
    
    start() {
        const self = this;
        this.cafeEmitter.on('음료 제작 요청', (task) => self.startTask(task));
    }

    do(status, task) {
        this.cafeEmitter.emit(`음료 제작 ${status}`, task);
        console.log(`${task.nickname}님의 ${task.drink.name} ${status}`);
        this.taskCount += status == '시작' ? 1 : -1;
    }

    startTask(task) {
        const self = this;
        this.do('시작', task);
        setTimeout(() => self.do('완료', task), task.drink.neededTime * 1000)
    }

    isAvailable() {
        return this.taskCount != 2;
    }

}

module.exports = Barista;