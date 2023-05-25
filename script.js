var videoelement = document.getElementById("videoElement");
var streamContraints = {
    audio: true,
    video: { width: 1920, height: 1080 },
};
var canvaselement = document.querySelector('#canvasElement');
var ctx = canvaselement.getContext('2d', { alpha: false });
var canvasInterval = null;
var fps=60


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


function drawImage(video) {
    ctx.drawImage(video, 0, 0, canvaselement.width, canvaselement.height);
    var data = ctx.getImageData(0, 0, 300, 400).data;
    console.log(data);
}
canvasInterval = window.setInterval(() => {
    drawImage(videoelement);
}, 1000 / fps);