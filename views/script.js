let optionIcon = document.querySelector(".option-icon i");
let optionBar = document.querySelector(".option-bar");
let pencilTool = document.querySelector(".pencil-tool");
let pencil = document.querySelector(".pencil");
let eraserTool = document.querySelector(".eraser-tool");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");
let canvas = document.querySelector("canvas");

optionIcon.addEventListener("click", (e) => {
  let iconAttr = optionIcon.getAttribute("class");
  if (iconAttr === "fa-solid fa-bars") {
    optionBar.style.display = "flex";
    optionIcon.setAttribute("class", "fa-solid fa-xmark");
  } else {
    optionBar.style.display = "none";
    optionIcon.setAttribute("class", "fa-solid fa-bars");
  }
});

pencil.addEventListener("click", (e) => {
  const displayValue = getComputedStyle(pencilTool).display;
  if (displayValue === "none") {
    pencilTool.style.display = "flex";
    eraserTool.style.display = "none";
  } else {
    pencilTool.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  const displayValue = getComputedStyle(eraserTool).display;
  if (displayValue === "none") {
    pencilTool.style.display = "none";
    eraserTool.style.display = "flex";
  } else {
    eraserTool.style.display = "none";
  }
});

canvas.onmousedown = () => {
  const displayValueEraser = getComputedStyle(eraserTool).display;
  const displayValuePencil = getComputedStyle(pencilTool).display;
  if (displayValueEraser === "flex" || displayValuePencil === "flex") {
    eraserTool.style.display = "none";
    pencilTool.style.display = "none";
  }
};
