//加载图片
Resources.load([
    'images/Evil-Minion-Icon-3.png',
    'images/Edith-despicable-me-2-icon.png',
    'images/evil-minion-icon-2.png',
    'images/happy-agnes-icon.png',
    'images/Evil-Minion-Icon-4.png',
    'images/girl-minion-icon.png'
])
//虫子的数组初始化
var allEnemies = [];

//设置每块区域的宽度和高度
var CELL_WIDTH = 101;
var CELL_HEIGHT = 83;

// 这是我们的玩家要躲避的敌人
var Enemy = function(option) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    //初始化X,Y轴及速度
    this.x = -CELL_WIDTH;
    this.y = 1;
    this.dd = 1;
    this.speed = option.speed ? option.speed : 300;
    this.reEnemy()
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = option.enemyImg ? option.enemyImg : 'images/Evil-Minion-Icon-3.png';
};

//随机数
Enemy.prototype.getRandomInt = function(min,max){
    return Math.floor(Math.random() * (max - min)) + min;

}

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    this.x += Math.floor(this.dd * dt);
    if (this.x >= CELL_WIDTH * 5){
        this.reEnemy();
    }
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
};
//重置虫子位置及速度
Enemy.prototype.reEnemy = function(){
    this.x = -CELL_WIDTH;
    this.y = this.getRandomInt(0, 3) * 83 + 63;
    this.dd = this.getRandomInt(100, this.speed);
}

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(option){
    //初始化玩家位置
    this.x = CELL_WIDTH * 2;
    this.y = 415 ;
    this.sprite = option.playerImg ? option.playerImg : 'images/Edith-despicable-me-2-icon.png';
}

Player.prototype.update = function(){
    for (let i = 0; i < allEnemies.length ;i++){

        //调整碰撞检测
        if (Math.abs(this.y - allEnemies[i].y) < 50 && Math.abs(this.x - allEnemies[i].x) < 50){
            this.x = CELL_WIDTH * 2;
            this.y = 415 ;
        }
    }
}

//渲染玩家试图
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y)
};

//判断按键并进行相应的位移
Player.prototype.handleInput = function(key){
    switch (key){
        case 'left':
            this.x -= CELL_WIDTH;
            this.x = this.x <= 0 ? 0 : this.x;
            break;
        case 'right':
            this.x += CELL_WIDTH;
            this.x = this.x >= CELL_WIDTH * 4 ? CELL_WIDTH * 4 : this.x;
            break;
        case 'up':
            this.y -= CELL_HEIGHT;
            this.y = this.y <= 0 ? 415 : this.y;
            break;
        case 'down':
            this.y += CELL_HEIGHT;
            this.y = this.y >= 415 ? 415 : this.y;
            break;
    }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。

