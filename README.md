# drawing-app-2
Learning how to build upon a drawing app

What is learned here:

-set up app for mobile
-create color picker
-adjust the weight of the pen's stroke
-Clear a canvas
-Undo an action

What I added
-Redo
-Eraser
-Showing range value
-Adjusted clear function to save a clear image in case user wants to undo a "clear"
-Load an image to a canvas 
-Changing opacity 
    -Solution: Added jscolor.js - a JavaScript library
    -Source: https://jscolor.com/

-Changing background's color [Work in progress]
-Saving image of canvas
    -For saving from IE/Edge browser: https://stackoverflow.com/questions/21860633/download-canvas-to-image-in-ie-using-javascript


    //For saving from Chrome/Firefox
    -Convert HTML5 Canvas to Image (PNG or JPG) - JavaScript Tutorial
    -Source: https://www.youtube.com/watch?v=YoVJWZrS2WU

-Keeping canvas size the same

Error noticed:

[FIXED]
A path would not be push into the array if the user draws a path and does not let go until they are outside the canvas
    -After pressing "Undo," the last path draw within the canvas would be deleted along with this path
    -OR
    -If another array is made, the path will disappear along with the last path of the new array


When only one path is done then undo, there is an error when "redo" is used
What helped to debug
-indexOf
