class Manager {
    constructor(cafeEmitter, waitingQueue, barista) {
        this.cafeEmitter = cafeEmitter;
        this.waitingQueue = waitingQueue;
        this.barista = barista;
    }    
    
    start(){
        const self = this;
        setInterval(() => self.assignTasks(), 1000);
    }

    assignTasks() {
        while(1){
            const task = this.waitingQueue.front();
            if(!task || !this.barista.isAvailable())break;
            this.waitingQueue.pop();
            this.cafeEmitter.emit('음료 제작 요청', task);
        }
        
    }
    
}

module.exports = Manager;