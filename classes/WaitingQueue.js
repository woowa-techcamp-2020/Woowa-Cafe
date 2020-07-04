class WaitingQueue {
    queue = [];
    frontId = 0;
    finishTaskCount = 0;
    constructor(cafeEmitter) {
        this.cafeEmitter = cafeEmitter;
    }

    start() {
        const self = this;
        this.cafeEmitter.on('주문 추가', (tasks) => self.push(tasks));
    }
    
    front() {
        if(this.isEmpty()) return;
        return this.queue[this.frontId];
    }

    isEmpty() {
        return this.queue.length === this.frontId;
    }

    push(tasks) {
        this.queue = this.queue.concat(tasks);
    }

    pop() {
        if(!this.isEmpty()) this.frontId++;
    }  
}

module.exports = WaitingQueue;