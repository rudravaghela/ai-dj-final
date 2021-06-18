leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;


function setup(){
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}

function draw(){
image(video,0,0,600,500);
fill("#ff0000");
stroke('#ff0000');

circle(rightWristX,rightWristY,20);
if (scorerightwrist > 0.2)
{

if (rightWristY > 0 && rightWristY <= 100)
{
document.getElementById("speed").innerHTML = "Speed = 0.5";
song.rate(0.5);
}
else if(rightWristY > 100 && rightWristY <= 200)
{
    document.getElementById("speed").innerHTML = "Speed = 1.0";
song.rate(1.0);
}
else if(rightWristY > 200 && rightWristY <= 300 ){
    document.getElementById("speed").innerHTML = "Speed = 1.5";
song.rate(1.5);
}
else if(rightWristY > 300 && rightWristY <= 400){
    document.getElementById("speed").innerHTML = "Speed = 2.0";
song.rate(2.0);
}
else if(rightWristY > 400 && rightWristY <= 500){
    document.getElementById("speed").innerHTML = "Speed = 2.5";
song.rate(2.5);
}
}

if(scoreleftwrist > 0.2) {
circle(leftWristX,leftWristY,20);
numberLeftWristY = Number(leftWristY);
remove_decimals = floor(numberLeftWristY);
volume = remove_decimals/500;
document.getElementById("volume").innerHTML = "volume = "+volume;
song.setVolume(volume);
}
}

function preload(){
song = loadSound("song1.mp3");

}

song = "";

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function pause(){
    song.pause();
}

function modelLoaded(){
    console.log("modelLoaded!");
}

function gotPoses(results){
 if(results.length > 0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist = "+scoreleftwrist);
        console.log("scorerightwrist = "+scorerightwrist);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWrist x = "+leftWristX+"leftWrist y = "+leftWristY);
        console.log("rightWrist x = "+rightWristX+"rightWrist y = "+rightWristY);

    }
}


