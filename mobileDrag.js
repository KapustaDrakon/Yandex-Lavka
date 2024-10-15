let elem;
let shiftX;
let shiftY;
let count = 0;

function moveAt(e) {
  if (!elem) return;
  elem.style.left = e.targetTouches[0].pageX - shiftX + "px";
  elem.style.top = e.targetTouches[0].pageY - shiftY + "px";
}

document.addEventListener("touchstart", function (e) {
  elem = e.target.closest(".draggable");
  if (!elem) return;

  shiftX = e.targetTouches[0].clientX - elem.getBoundingClientRect().left;
  shiftY = e.targetTouches[0].clientY - elem.getBoundingClientRect().top;

  elem.style.position = "absolute";
  elem.style.zIndex = 1000;
  elem.style.width = e.target.naturalWidth + "px";
  elem.style.height = e.target.naturalHeight + "px";
  document.body.appendChild(elem);
  moveAt(e);
  e.preventDefault();
});

let currentDroppable = null;
let lastY = 1;
document.addEventListener("touchmove", function (e) {
  if (!elem) return;
  moveAt(e);
  elem.hidden = true;
  let elemBelow = document.elementFromPoint(
    e.targetTouches[0].clientX,
    e.targetTouches[0].clientY
  );
  elem.hidden = false;

  if (!elemBelow) return;
  let droppableBelow = elemBelow.closest(".droppable");
  if (currentDroppable != droppableBelow) {
    currentDroppable = droppableBelow;
  }

  
  let lastS = document.documentElement.scrollTop;
  if (lastS == 0 && (lastY - e.touches[0].clientY) < 0 && e.cancelable) {
    e.preventDefault();
    e.stopPropagation();
  }
  lastY = e.touches[0].clientY;
});

document.addEventListener("touchend", function (e) {
  if (!elem) return;
  if (currentDroppable) {
    count++;
    elem.style.transform = `rotate(${Math.floor(
        Math.random() * (50 - -50 + 1) + -50
    )}deg)`;
    elem.style.width = e.target.naturalWidth * 1.2 + "px";
    elem.style.height = e.target.naturalHeight * 1.2 + "px";
    elem.style.left = parseInt(elem.style.left) / (window.innerWidth / 100) + '%';
    elem.style.top = parseInt(elem.style.top) / (window.innerHeight / 100) + '%';
  }
  if (count === 3) {
    let button = document.querySelector(".button-pay");
    button.style.visibility = "visible";
  }
  elem.style.zIndex = 0;
  e.preventDefault();
});
