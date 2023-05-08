import { NoteTimingEvent } from "abcjs";

function positionCursor(cursor: { setAttribute: (arg0: string, arg1: any) => void; }, x1: number, x2: number, y1: number, y2: number) {
  console.log("positionCursor")
  if (cursor) {
    cursor.setAttribute("x1", x1);
    cursor.setAttribute("x2", x2);
    cursor.setAttribute("y1", y1);
    cursor.setAttribute("y2", y2);
  }
}

const CursorControl = function (selector: string) {
  this.selector = selector + " svg";
  this.lastSvg = null;
  this.beatSubdivisions = 2;
  this.onReady = function () {

  }

  this.onStart = function () {
    const svgs = document.querySelectorAll(this.selector);
    svgs.forEach(svg => {
      // 创建一个line元素
      if (!svg.querySelector(".abcjs-cursor")) {
        const cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
        cursor.setAttribute("class", "abcjs-cursor");
        cursor.setAttributeNS(null, 'x1', '0');
        cursor.setAttributeNS(null, 'y1', '0');
        cursor.setAttributeNS(null, 'x2', '0');
        cursor.setAttributeNS(null, 'y2', '0');
        svg.appendChild(cursor);
      }
    })
    this.lastSvg = null;
  }

  this.onBeat = function (beatNumber: number, totalBeats: number, totalTime: number) {
    console.log("Beat " + beatNumber + " is happening." + totalBeats + totalTime);
  }

  this.onEvent = function (event: NoteTimingEvent) {
    if (event.measureStart && event.left === null)return; // this was the second part of a tie across a measure line. Just ignore it.

    // 当前操作的音符
    const lastSelection = document.querySelectorAll(this.selector + " .highlight");
    for (let k = 0; k < lastSelection.length; k++)
      lastSelection[k].classList.remove("highlight");

    for (let i = 0; i < event.elements.length; i++) {
      const note = event.elements[i];
      for (let j = 0; j < note.length; j++) {
        note[j].classList.add("highlight");
      }
    }

    // 当前播放音符前的标记
    if (!(event.elements && event.elements.length > 0 && event.elements[0].length > 0)) return;
    const svg = event.elements[0][0].closest('svg')
    if (this.lastSvg === null) {
      this.lastSvg = svg;
    } else {
      if (this.lastSvg.parentElement && this.lastSvg.parentElement.offsetTop !== svg.parentElement.offsetTop) {
        positionCursor(this.lastSvg.querySelector(".abcjs-cursor"), 0, 0, 0, 0)
        this.lastSvg = svg;
      }
    }
    const cursor = svg.querySelector(".abcjs-cursor")
    positionCursor(cursor, event.left - 2, event.left - 2, event.top, event.top + event.height)
  }

  this.onFinished = function () {
    const els = document.querySelectorAll(this.selector + " .highlight");
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove("highlight");
    }
    const cursor = document.querySelector(this.selector + " .abcjs-cursor");
    positionCursor(cursor, 0, 0, 0, 0)
  }
}
export default CursorControl;
