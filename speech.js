



//works on firefox and chrome only
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;




var myGamePiece;

function startGame()
{
    myGamePiece = new component(55, 55, "https://images.unsplash.com/photo-1550440403-8d30a74cd58f?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ", 10, 120, "image");
    myGameArea.start();
}

var myGameArea =
{
    canvas : document.createElement("canvas"),
    start : function()
    {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function()
    {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type)
{
    this.type = type;
    if (type == "image")
    {
        this.image = new Image();
        this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function()
    {
        ctx = myGameArea.context;
        if (type == "image")
        {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        }
        else
        {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function()
    {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea()
{
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup()
{
    myGamePiece.speedY = -1;
}

function movedown()
{
    myGamePiece.speedY = 1;
}

function moveleft()
{
    myGamePiece.speedX = -1;
}

function moveright()
{
    myGamePiece.speedX = 1;
}

function clearmove()
{
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}



function moveupspeech()
{
    myGamePiece.speedY = -10;
}

function movedownspeech()
{
    myGamePiece.speedY = 10;
}

function moveleftspeech()
{
    myGamePiece.speedX = -10;
}

function moverightspeech()
{
    myGamePiece.speedX = 10;

}


//create boolean for recording contorl
var reocrding = true;




//create speech recognitioin

var speecRec = new SpeechRecognition();


// speecRec.interimResults = false;
// speecRec.maxAlternatives = 1;


console.log(speecRec);


function startRecording()
{
    speecRec.stop();
  console.log("clicked");

  speecRec.start();
  console.log('Recording sound');


}


// // start recording

document.getElementById("record").onclick = startRecording;



//  change background color based on speech input
speecRec.onresult = function(event)
  {
    console.log("recieved");
    var move = event.results[0][0].transcript;
    console.log(move);



    switch (move) {

       case "right":
        moverightspeech();
        setTimeout(clearmove, 300);

        break;

      case "left":
        moveleftspeech();
        setTimeout(clearmove, 300);

        break;

      case "top":
        moveupspeech();
        setTimeout(clearmove, 300);
        break;

      case "down":
        movedownspeech();
        setTimeout(clearmove, 300);
        break;

      default:
        clearmove();
    }


  }
