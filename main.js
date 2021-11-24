const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;

let context = canvas.getContext("2d");

let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);


function background_color(element) {
    context.fillStyle = element.value;
    context.fillRect(0, 0, canvas.width, canvas.height);

    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
}



let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

//Osagie Edit
let removed;
let removedLast = [];

//Storing paths
let restore_array = [];
let index = -1; //0 would mean that there is already a path inside; 0 for image

//Osagie Edit
let removed_array = [];
let indexRemoved = -1;

//Osagie Edit for showing range's value
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    draw_width = this.value; //this must be before output.innerHTML
    output.innerHTML = this.value;
}

//Osagie Edit
let imageValue;  


//For changing color with color fields
function change_color(element) {
    draw_color = element.style.background;
}

//Osagie Edit
function erase_color() {
    //To prevent the color of the main background
    draw_color = start_background_color;

    // context.globalCompositeOperation = 'destination-out'
}

// For mobile and tablets
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);


//For computer
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


function start(event) {
    is_drawing = true;

    //Osagie edit
    context.linecap = 'round';
    context.lineTo(event.clientX, event.clientY);    

    context.beginPath();

    context.moveTo(event.clientX - canvas.offsetLeft,
                    event.clientY - canvas.offsetTop);
    
    event.preventDefault(); //To prevent default changes to appear
}

function draw(event) {
    

    if(is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop);

        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round"; //To get a full line with less interruptions

        // Osagie Edit
        


        context.stroke();
        
        //Fixing path not undoing on itself error
        lastX = event.clientX - canvas.offsetLeft;
        lastY = event.clientY - canvas.offsetTop;
    }

    event.preventDefault();
}

function stop(event) {
    
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;

        //Osagie Edit (Moved code to here)
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        
        index += 1; // wi

    }

    event.preventDefault();

    //Osagie Edit
    //Commented out the if statement below AND move the block to under the if(is_drawing) to fix path undoing with another path error
/*
    if (event.type != 'mouseout') {
        //Fixing path not undoing on itself error
        //Old code
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        
        index += 1; // will get 0 to start, putting the first path at index 0 in the array
    }

    */
    console.log(restore_array);
}

function clear_canvas() {
    //declaring the fill's color 
    context.fillStyle = start_background_color;

    //Osagie Edit
    drawing_image(imageValue);
    
    //Osagie Edit
    removed_array.push(context.getImageData(0, 0, canvas.width, canvas.height));

    context.clearRect(0, 0, canvas.width, canvas.height); //clears the background
    context.fillRect(0, 0, canvas.width, canvas.height); //refills with white again

    


    //reset array and index
    restore_array = [];
    index = -1;

    removed_array = [];
    indexRemoved = -1;
}

function undo_last() {
    //Osagie Edit /commented out (index <= 0) logic
    if (index === 0) {
        // Osagie Edit
        // restore_array.pop();    
        // removedLast.push(context.getImageData(0, 0, canvas.width, canvas.height));

        // clear_canvas();
        console.log("do nothing")

    } else if (index < 0) {

        clear_canvas();
    } 
    
    
    else {

        index -= 1;



            //Osagie Edit: Removed and Removed_array
            // removed = restore_array.pop();
            
            //Add removed to removed_array
            removed_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
            indexRemoved += 1;

    

            
            restore_array.pop();
            
            // restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
            
            context.putImageData(restore_array[index], 0, 0);

            // Osagie Edit
            document.querySelector(".redo").disabled = false;
            
            console.log("Undo - current removed array:" + removed_array.indexOf(removed_array[indexRemoved]));
            console.log("Undo - current restore array:" + restore_array.indexOf(restore_array[index]));
        }
    

  
        
}

//Osagie Edit
function redo_last() {

    console.log(index);
    console.log(restore_array.length)
    console.log("Redo - current removed array:" + removed_array.indexOf(removed_array[indexRemoved]));
    console.log("Redo - current restore array:" + restore_array.indexOf(restore_array[index]));
    


    if (index === -1) {
        context.putImageData(removedLast[0], 0, 0);
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    } else if (index < restore_array.length) {

        // removed_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        context.putImageData(removed_array[indexRemoved], 0, 0);
        removed_array.pop();
        indexRemoved -= 1;

        //to put the returned imaged back to the restore_array

        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;

        console.log("Current restore Array: " + restore_array[index]);
        console.log("Current removed Array:" + removed_array[indexRemoved]);

        if (removed_array.indexOf(removed_array[indexRemoved]) === -1) {
            document.querySelector(".redo").disabled = true; //Needed to prevent an error showing in the console
        }

        //Problem
        // returns the last removed only AND, after using redo_last() to the max,
        //the last two paths are returned 
        // Possible Solution: create another array for storing removed ImageData s
            //Then use putImageData on the last element(the last removed ImagedData)
            //Then use restore_array.push(...) to save the new state i
    }    
}

//Loading image onto a canvas


// $('.image').click(function(event) {
//     event.preventDefault(); //To prevent browser from opening to a link of the image
//     drawing_image(event.target.value);
//     // drawing_Image(event);
    
// });


// function drawing_image(image){
 

//Osagie Edit - For loading picture onto canvas
function drawing_image(image) {
    let newImage = new Image();

    newImage.onload = function() {
        context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
        restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        
        index += 1; // wi
    }

    // newImage.src = "./images/chiaki_nanami.jpg"

    // newImage.src = "./images/Beautiful-girls-with-Monokuma.png";

    if (image !== undefined) {
    newImage.src = image;
    }

        // restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
        
        // index += 1; // 

}

// }

// drawing_image();

//Possible solution
//Create options instead
//Get the value using event.value and assign it to newImage.src 



function getValue(element) {
    imageValue = element.src;
    console.log(imageValue)
    drawing_image(imageValue);
}


// btnDownload.addEventListener("click", function () {
    //IE does not support the downloads of dataURI

    // IE/Edge Support (PNG Only)
//     if (window.navigator.msSaveBlob) {  //This line check if the window is IE or Edge
//         window.navigator.msSaveBlob(canvas.msSaveBlob(), "canvas-image.png");
//     }

//     console.log("okay")
// });


function saveCanvas() {
    //Note: window.navigator does not work

    if (canvas.msToBlob) { // IE (PNG only)
        let blob = canvas.msToBlob();
        window.navigator.msSaveBlob(blob, 'canvas-image.png');
    } else { // CH, FF
        // let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        // window.location.href = image;

        const a = document.createElement("a");

        document.body.appendChild(a);
        a.href = canvas.toDataURL();
        a.download = "canvas-image.png";
        a.click();
    }
}



//Opacity


    // $(".opacity").change(function() {
  
    //   let opacity = $(".opacity").val();
    //   let color = draw_color;
  
    //   let rgbaCol = 'rgba(' + parseInt(color.slice(-6, -4), 16) + ',' + parseInt(color.slice(-4, -2), 16) + ',' + parseInt(color.slice(-2), 16) + ',' + opacity + ')';
  
    //   draw_color = rgbaCol;
    // })

// function getRGBColor(element) {
//     let hex = element.value;
//     let rgb = hexTorgb(hex);

//     console.log(rgb);
//     console.log(hex);

//     console.log(rgb[0])
//     console.log(rgb[1])
//     console.log(rgb[2])
// }


// function hexTorgb(hex) {
//     return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
//   }