// initialize the svg and add it to the HTML body tag
const paper = SVG().addTo("body").size("100%", "100%");

// height of the ladder
const ladderHeight = 450;

const degrees = 180;

const originX = 300;
const originY = ladderHeight + 100;

const groundHeight = 30;

var ladderLine = null;
var pointOnTheLadder = null;

document.getElementById("start").onclick = function () {
  // clean the previous picture
  paper.clear();

  // draw the wall
  paper
    .line(0, 0, 0, ladderHeight + groundHeight * 2)
    .stroke({ color: "#660000", width: groundHeight })
    .move(originX - groundHeight / 2, originY - ladderHeight - groundHeight);

  // draw the ground
  paper
    .line(
      originX - groundHeight,
      originY + groundHeight / 2,
      originX + ladderHeight + 50,
      originY + groundHeight / 2
    )
    .stroke({ color: "#006600", width: groundHeight });

  // get the point's location on the ladder from the user input
  let pointOnLadder = +document.getElementById("point").value / 10;

  // initialize the counter
  let count = 0;

  // disable the button till animation completes
  document.getElementById("start").disabled = true;

  var interval = window.setInterval(() => {
    // angle in rad
    var theta = Math.asin(count / ladderHeight);

    // slow down as angle increases
    count += 3;

    var newX = originX + ladderHeight * Math.sin(theta);
    var newY = originY - ladderHeight * Math.cos(theta);

    // compute the locus point origin
    var locusX = originX + pointOnLadder * ladderHeight * Math.sin(theta);
    var locusY = originY - ladderHeight * (1 - pointOnLadder) * Math.cos(theta);

    // plot the locus point
    paper
      .circle(4)
      .fill("#ffff00")
      .move(locusX - 2, locusY - 2);

    // if old the ladder and point on the ladder exist remove them
    ladderLine && ladderLine.remove();
    pointOnTheLadder && pointOnTheLadder.remove();

    // plot the ladder and point on the ladder
    ladderLine = paper
      .line(originX, newY, newX, originY)
      .stroke({ color: "#fff", width: 6, linecap: "round" });
    
    pointOnTheLadder = paper
      .circle(16)
      .fill("#ff0000")
      .move(locusX - 8, locusY - 8);

    // when the ladder reaches ground stop
    // angle in degrees
    var angle = (theta * degrees) / Math.PI;
    if (Math.ceil(angle) >= 90) {
      window.clearInterval(interval);
      document.getElementById("start").disabled = false;
    }
  }, 30);
};
