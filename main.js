function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
video = "";
status = "";
objects = [];

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function perload() {
    song1 = loadSound("stranger_things (1).mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {

    image(video, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            document.getElementById("baby").innerHTML = "Baby Found";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    } else {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            document.getElementById("baby").innerHTML = "Not Baby Found";
            play("stranger_things (1).mp3");
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}