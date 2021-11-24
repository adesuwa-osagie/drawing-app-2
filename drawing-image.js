
let imageValue;

function getValue(element) {
    imageValue = element.src;
    console.log(imageValue)
    drawing_image(imageValue);
}


function drawing_image(image) {

    console.log("okay")
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