class DashBoard {
    tasks = [];

    constructor(cafeEmitter){
        this.cafeEmitter = cafeEmitter;
    }
    start() {
        const self = this;
        this.cafeEmitter.on('주문 추가', (tasks) => self.create(tasks));
        this.cafeEmitter.on('현황판 업데이트', (task, status) => self.update(task, status));
        this.cafeEmitter.on('현황판 보기', (nickname) => self.show(nickname));
    }

    create(tasks) {
        this.tasks = this.tasks.concat(tasks.map(task => {
            task.status = '대기중';
            return task;
        }));
    }

    update(task, status) {
        this.tasks.find(_task => _task.id === task.id).status = status;
    }
    
    show(nickname) {
        const userTasks = this.tasks.filter(task => task.nickname === nickname);
        const waitingCount = userTasks.filter(task => task.status == '대기중').length;
        const workingCount = userTasks.filter(task => task.status == '제작중').length;
        const completeCount = userTasks.filter(task => task.status == '완료').length;
        console.log(`${nickname}님의 주문현황판입니다.`);
        console.log('=====================================')
        console.log(`현재 대기중: ${waitingCount}, 제작중: ${workingCount}, 완료: ${completeCount}`);
        userTasks.reverse().forEach(task => console.log(`${task.nickname}님 ${task.drink.name} : ${task.status}`));
        console.log('=====================================')
    }

}

module.exports = DashBoard;