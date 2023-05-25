var videoelement = document.getElementById("videoElement");
var streamContraints = {
    audio: false,
    video: { width: 1920, height: 1080 },
};
var canvaselement = document.querySelector('#canvasElement');
var ctx = canvaselement.getContext('2d', { alpha: false });
var canvasInterval = null;
var fps=60, xPos = 0, yPos = 0, count = 0;
var audio = new Audio('https://github.com/Turballd/CheatingDetector/blob/main/Cheating.mp3?raw=true');
document.addEventListener("click", getMousePos);

if (videoelement) {
    navigator.mediaDevices
    .getUserMedia(streamContraints)
    .then(gotStream)
    .catch(function (e) {
        if (confirm("An error with camera occured:(" + e.name + ") Do you want to reload?")) {
            location.reload();
        }
    });
}
//if stream found 
function gotStream(stream) {
    videoelement.srcObject = stream 
    videoelement.play()
}

function getMousePos(event){
    xPos = event.clientX;
    yPos = event.clientY;
}   
  
function drawImage(video){
    if(count >= 160){
        audio.play()
    }
    ctx.drawImage(video, 0, 0, canvaselement.width, canvaselement.height);
    var data = ctx.getImageData(xPos, yPos, 1, 1).data;
    if(data[0] < 20){
        count = 0;
    }else if(data[0] >= 20){
        count++;
    }
}

canvasInterval = window.setInterval(() => {
    drawImage(videoelement);
}, 1000 / fps);
