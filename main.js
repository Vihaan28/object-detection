objectDetector="";
img ="";
status="";
object=[];


function setup(){
    canvas = createCanvas(380 , 380);
    canvas.center();
    video=createCapture( VIDEO );
    video.size(380 , 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = " status : detecting objects";
    
}

function modalLoaded(){
    console.log( " cocossd modal loaded");
    status=true;
    
}

function gotresults(error , results ){
    if(error){
        console.error(error);
    }
     console.log(results);
     object = results;

}

function draw(){
    image(video , 0 , 0 , 380 , 380 );
    r=random(225);
    g=random(225);
    b=random(225);
    
    if(status !=""){
        objectDetector.detect(video , gotresults);
     for( var i = 0 ; i < object.length; i++){

        document.getElementById("status").innerHTML = "status : object detected";
        document.getElementById("numberofob").innerHTML = " Number of objects detected are = " + object.length;

        fill( r ,g,b );
        percent = floor(object[i].confidence*100);
        text(object[i].label + " " + percent + " % " , object[i].x + 10 , object[i].y + 10);
        noFill();
        stroke("red");
        rect( object[i].x , object[i].y , object[i].width , object[i].height);
    }
}
}