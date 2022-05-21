class Lifegame {
  private _squaresCount = 20;
  protected _canvas: HTMLCanvasElement;
  protected _context: CanvasRenderingContext2D | null;
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    if (!this._canvas || !this._context) throw new Error('invalid canvas');
    // 一旦全体を白塗り
    this._context.fillStyle = 'white';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    // 枠描画
    this._context.beginPath();
    this._context.lineWidth = 2;
    this._context.strokeStyle = 'black';
    // 上横線
    this._context.moveTo(0, 0);
    this._context.lineTo(this._canvas.width, 0);
    this._context.stroke();
    // 右縦線
    this._context.moveTo(this._canvas.width, 0);
    this._context.lineTo(this._canvas.width, this._canvas.height);
    this._context.stroke();
    // 下横線
    this._context.moveTo(this._canvas.width, this._canvas.height);
    this._context.lineTo(-(this._canvas.width), this._canvas.height);
    this._context.stroke();
    // 左縦線
    this._context.moveTo(0, this._canvas.height);
    this._context.lineTo(0, -(this._canvas.height));
    this._context.stroke();

    // 全部のマス目(20 x 20)を白で塗り潰し
    this._context.moveTo(0, 0);
    this._context.fillStyle = 'white';
    const squareWidth = this._canvas.width / this._squaresCount
    const squareHeight = this._canvas.height / this._squaresCount
    for (let i = 0; i < this._squaresCount; i++) {
      for (let ii = 0; ii < this._squaresCount; ii++) {
        const x = i === 0 ? this._context.lineWidth : i * squareWidth + this._context.lineWidth;
        const y = ii * squareHeight + this._context.lineWidth;
        const w = squareWidth - this._context.lineWidth;
        const h = squareHeight - this._context.lineWidth;
        this._context.fillRect(x, y, w, h);
      }
    }
    // 罫線描画
    // 縦線
    for (let i = 0; i < this._canvas.width + 1; i++) {
      this._context.moveTo((i * (this._canvas.width / this._squaresCount)), 0);
      this._context.lineTo((i * (this._canvas.width / this._squaresCount)), this._canvas.height);
      this._context.stroke();
    }

    // 横線
    for (let i = 0; i < this._canvas.height + 1; i++) {
      this._context.moveTo(0, (i * (this._canvas.height / this._squaresCount)));
      this._context.lineTo(this._canvas.width, (i * (this._canvas.height / this._squaresCount)));
      this._context.stroke();
    }
    this._canvas.addEventListener('click', this.onCLick)
  }

  get context(): CanvasRenderingContext2D | null {
    return this._context;
  }

  onCLick = (e: Event) => {
    const pe = e as PointerEvent;
    const clickedElement: HTMLElement = pe.target as HTMLElement;
    const rect = clickedElement.getBoundingClientRect();
    const x = pe.clientX - rect.left;
    const y = pe.clientY - rect.top;
    console.log(`x: + ${x} y: + ${y}`);
  }
}

const initCanvas = (): void => {
  const canvas: HTMLCanvasElement | null = document.querySelector('#lifegame');
  if (canvas) new Lifegame(canvas);
};

window.onload = () => {
  initCanvas();
};