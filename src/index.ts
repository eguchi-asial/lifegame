// const sayHello = (message: string): void => {
//   alert(message);
// }

// sayHello('おっす!!!!');

class Lifegame {
  protected _canvas: HTMLCanvasElement;
  protected _context: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
  }

  get context(): CanvasRenderingContext2D {
    return this.context;
  }
}

const initCanvas = (): void => {
  const canvas: HTMLCanvasElement = document.querySelector('#lifegame');
  const lifegame: Lifegame = new Lifegame(canvas);
  console.log(lifegame.context);
};

window.onload = () => {
  initCanvas();
};