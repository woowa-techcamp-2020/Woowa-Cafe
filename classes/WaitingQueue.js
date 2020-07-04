class WaitingQueue {
    queue = [];
    constructor(cafeEmitter) {
        const self = this;
        cafeEmitter.on('주문 추가', function(order) {
            console.log(order.drinks);
            self.queue = self.queue.concat(order.drinks);
            console.log(self.queue);
        });
    }
}

module.exports = WaitingQueue;