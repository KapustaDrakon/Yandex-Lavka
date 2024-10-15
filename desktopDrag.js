count = 0;

document.onmousedown = function (e) {
  let elem = e.target.closest(".draggable");
  if (!elem) return;

  let shiftX = e.clientX - elem.getBoundingClientRect().left;
  let shiftY = e.clientY - elem.getBoundingClientRect().top;

  elem.style.position = "absolute";
  elem.style.zIndex = 1000;
  elem.style.width = e.target.naturalWidth + "px";
  elem.style.height = e.target.naturalHeight + "px";
  document.body.appendChild(elem);
  moveAt(e);

  function moveAt(e) {
    elem.style.left = e.pageX - shiftX + "px";
    elem.style.top = e.pageY - shiftY + "px";
  }

  let currentDroppable = null;
  document.onmousemove = function (e) {
    moveAt(e);

    elem.hidden = true;
    let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    elem.hidden = false;

    if (!elemBelow) return;

    let droppableBelow = elemBelow.closest(".droppable");
    if (currentDroppable != droppableBelow) {
      currentDroppable = droppableBelow;
    }
  };

  elem.onmouseup = function () {
    if (currentDroppable) {
      count++;
      elem.style.zIndex = 0;
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
    document.onmousemove = null;
    elem.onmouseup = null;
  };

  elem.ondragstart = function () {
    return false;
  };
};
