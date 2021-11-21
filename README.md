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

Error noticed:

[FIXED]
A path would not be push into the array if the user draws a path and does not let go until they are outside the canvas
    -After pressing "Undo," the last path draw within the canvas would be deleted along with this path
    -OR
    -If another array is made, the path will disappear along with the last path of the new array


When only one path is done then undo, there is an error when "redo" is used
What helped to debug
-indexOf
