// Define helper functions here.
// For example:

function square(side) {
   repeat(4, function () {
      forward(side);
      right(90);
   });
}


function demo() {
   hideTurtle();
   colour(0,0,255,1);
   for(s = 100; s > 0; s -= 10) {
      square(s);
      right(36);
      circle();
      moveCar();
   }
}