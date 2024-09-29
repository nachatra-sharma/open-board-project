canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let c = canvas.getContext("2d");
let pencilColors = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector("#pencil-width");
let eraserWidthElem = document.querySelector("#eraser-width");
let download = document.querySelector(".download");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");
let pencilWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let colorObject = {
  black: "#1e1e1e",
  red: "#e03131",
  blue: "#1971c2",
  yellow: "#f08c00",
};
let pencilColor = colorObject.black;
let eraserColor = "white";
let socket = io();

let undoRedoTracker = []; // data
let track = 0; // represent which action from tracker array

c.strokeStyle = pencilColor; // chnage the color of line
c.lineWidth = pencilWidth; // width of line
let mouseDown = false;

// mouse down -> start new path
canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;
  let path = beginPath(e);
  socket.emit("begin-path", path);
});

// mouse move -> fill the path
canvas.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    let path = drawStorke(e);
    socket.emit("draw-stroke", path);
  }
});

// mouse up -> end of the path
canvas.addEventListener("mouseup", () => {
  mouseDown = false;
  let url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
});

undo.addEventListener("click", () => {
  if (track > 0) {
    track--;
  }
  //action
  let trackObject = {
    trackValue: track,
    undoRedoTracker,
  };
  socket.emit("undo", trackObject);
  undoRedoCanvas(trackObject);
});

redo.addEventListener("click", () => {
  if (track < undoRedoTracker.length - 1) {
    track++;
    //action
    let trackObject = {
      trackValue: track,
      undoRedoTracker,
    };
    socket.emit("redo", trackObject);
    undoRedoCanvas(trackObject);
  }
});

function undoRedoCanvas(trackObject) {
  track = trackObject.trackValue;
  undoRedoTracker = trackObject.undoRedoTracker;

  c.clearRect(0, 0, canvas.width, canvas.height);

  let url = undoRedoTracker[track];
  let img = new Image(); // new image reference element
  img.src = url;
  img.onload = () => {
    c.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

function beginPath(e) {
  c.beginPath();
  c.moveTo(e.clientX, e.clientY);
  return {
    x: e.clientX,
    y: e.clientY,
  };
}

function drawStorke(e) {
  c.lineTo(e.clientX, e.clientY);
  c.stroke();
  return {
    x: e.clientX,
    y: e.clientY,
  };
}

pencilColors.forEach((colorElem) => {
  colorElem.addEventListener("click", () => {
    let color = colorElem.classList[0];
    if (colorObject[color]) {
      pencilColor = colorObject[color];
      c.strokeStyle = pencilColor;
      socket.emit("stroke-color", c.strokeStyle);
    }
  });
});

pencilWidthElem.addEventListener("change", () => {
  if (pencilWidthElem) {
    pencilWidth = pencilWidthElem.value;
    c.lineWidth = pencilWidth;
    socket.emit("stroke-width", c.lineWidth);
  }
});

eraserWidthElem.addEventListener("change", () => {
  eraserWidth = eraserWidthElem.value;
  c.lineWidth = eraserWidth;
  socket.emit("eraser-width", c.lineWidth);
});

function strokeEraserWidth(data) {
  const displayValue = getComputedStyle(eraserTool).display;
  if (displayValue !== "none" || data.eraserWidth) {
    c.strokeStyle = eraserColor;
    c.lineWidth = data.eraserWidth;
  } else {
    c.strokeStyle = data;
    c.lineWidth = data;
  }
}

eraser.addEventListener("click", () => {
  strokeEraserWidth(pencilWidth);
});

// download here

download.addEventListener("click", () => {
  let url = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
});

// socket code here

socket.on("begin-path", (data) => {
  function beginPath(e) {
    c.beginPath();
    c.moveTo(e.x, e.y);
  }
  beginPath(data);
});

socket.on("draw-stroke", (data) => {
  function drawStorke(e) {
    c.lineTo(e.x, e.y);
    c.stroke();
  }
  drawStorke(data);
});

socket.on("undo", (data) => {
  undoRedoCanvas(data);
});

socket.on("redo", (data) => {
  undoRedoCanvas(data);
});

socket.on("stroke-width", (data) => {
  strokeEraserWidth(data);
});

socket.on("eraser-width", (data) => {
  strokeEraserWidth({ eraserWidth: data });
});

socket.on("stroke-color", (data) => {
  strokeEraserWidth(data);
});
