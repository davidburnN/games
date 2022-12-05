
class Snake{
    constructor(x, y, size){
        this.x = x
        this.y = y
        this.size = size 
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1
    }

    move(){
        var newRect;
        if(this.rotateX == 1){
            newRect = {
                x:this.tail[this.tail.length - 1].x + this.size,
                y:this.tail[this.tail.length - 1].y
            }
        } else if(this.rotateX == -1){
            newRect = {
                x:this.tail[this.tail.length - 1].x - this.size,
                y:this.tail[this.tail.length - 1].y
            }
        } else if(this.rotateY == 1){
            newRect = {
                x:this.tail[this.tail.length - 1].x,
                y:this.tail[this.tail.length - 1].y + this.size
            }
        } else if(this.rotateY == -1){
            newRect = {
                x:this.tail[this.tail.length - 1].x,
                y:this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)
    }
}


class Apple{
    constructor(){
        var isTouching;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for(var i = 0; i < snake.tail.length;i++){
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true
                }
            }
            this.color = "pink"
            this.size = snake.size
            if(!isTouching){
                break;
            }
            
        }
    }
}

class EndingPost{
    constructor(width, height){
        this.width = width 
        this.height = height
        this.x = Math.floor((canvas.width-this.width)/2)
        this.y = Math.floor((canvas.height-this.height)/2)
        this.color = 'white'
    }
}


var canvas = document.getElementById("canvas")

var snake = new Snake(20, 20, 20)

var apple = new Apple()

var canvasContext = canvas.getContext('2d')

var shotdown = 0

var binCount = Math.floor(canvas.width/snake.size)

var footPrint = new Array(binCount)

for (var i = 0; i<binCount; i ++){
    footPrint[i] = new Array(binCount)
}

for (var i = 0; i<binCount; i ++){
    for (var j = 0; j<binCount; j ++){
        footPrint[i][j] = 0
    }
}

// console.log(footPrint)

window.onload = ()=>{
    gameLoop();
}

function gameLoop(){
    intervalID = setInterval(show, 1000/5) //here 15 is our fps value
    
}

function ending(){
    var ending = new EndingPost(300, 200)
    createRect(0,0,canvas.width, canvas.height, "black")
    createRect(ending.x, ending.y, ending.width, ending.height, "white")
    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "black"
    canvasContext.textAlign = 'center'
    canvasContext.fillText("You died. Final score: " + (snake.tail.length + 1),
    ending.x+ending.width/2, ending.y+ending.height/2);
}

function show(){
    // update();
    draw();
    if(shotdown == 1){
        window.clearInterval(intervalID)
        ending()
    }
}


function update(){
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    console.log("update")
    snake.move()
    eatApple()
    checkHitWall()
    checkHitBody()
}

function checkHitBody(){
    // if(headTail.x == )
}

function checkHitWall(){
    var headTail = snake.tail[snake.tail.length - 1]
    if(headTail.x == - snake.size){
        headTail.x = canvas.width - snake.size
    } else if(headTail.x == canvas.width){
        headTail.x = 0
    } else if(headTail.y == - snake.size){
        headTail.y = canvas.height - snake.size
    } else if(headTail.y == canvas.height){
        headTail.y = 0
    }
}

function eatApple(){
    if(snake.tail[snake.tail.length - 1].x == apple.x && 
        snake.tail[snake.tail.length - 1].y == apple.y){
            snake.tail[snake.tail.length] = {x:apple.x, y:apple.y}
            apple = new Apple()
            
        }
}

function draw(){
    createRect(0,0,canvas.width, canvas.height, "black")
    for(var i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size - 5, 'white')
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: " + (snake.tail.length + 1),
    canvas.width - 120, 18);
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}

function createRect(x, y, width, height, color){
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}

window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = -1
            snake.rotateY = 0;
        } else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0
            snake.rotateY = -1;
        } else if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1
            snake.rotateY = 0;
        } else if(event.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0
            snake.rotateY = 1;
        }
    })
})