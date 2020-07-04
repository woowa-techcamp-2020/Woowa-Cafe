class Barista {
    taskCount = 0;

    constructor(cafeEmitter){
        this.cafeEmitter = cafeEmitter;
    }
    
    start() {
        const self = this;
        this.cafeEmitter.on('음료 제작 요청', (task) => self.startTask(task));
    }

    startTask(task) {
        const self = this;
        this.taskCount ++;
        console.log(`${task.nickname}님의 ${task.drink.name} 시작`);
        setTimeout(() => self.finishTask(task), task.drink.neededTime * 1000)
    }

    finishTask(task) {
        console.log(`${task.nickname}님의 ${task.drink.name} 종료`);
        this.taskCount --;
    }

    isAvailable() {
        return this.taskCount != 2;
    }

}

module.exports = Barista;