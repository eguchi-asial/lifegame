class Lifegame {
  protected _canvas: HTMLCanvasElement;
  protected _context: CanvasRenderingContext2D | null;
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    if (!this._canvas || !this._context) throw new Error('invalid canvas');
    // 枠描画
    this._context.beginPath();
    this._context.lineWidth = 2;
    // 上横線
    this._context.moveTo(0, 0);
    this._context.lineTo(canvas.width, 0);
    this._context.stroke();
    // 右縦線
    this._context.moveTo(canvas.width, 0);
    this._context.lineTo(canvas.width, canvas.height);
    this._context.stroke();
    // 下横線
    this._context.moveTo(canvas.width, canvas.height);
    this._context.lineTo(-(canvas.width), canvas.height);
    this._context.stroke();
    // 左縦線
    this._context.moveTo(0, canvas.height);
    this._context.lineTo(0, -(canvas.height));
    this._context.stroke();

    // 罫線描画(20マス)
    // 縦線
    for (let i = 0; i < canvas.width + 1; i++) {
      this._context.moveTo((i * (canvas.width / 20)), 0);
      this._context.lineTo((i * (canvas.width / 20)), canvas.height);
      this._context.stroke();
    }

    // 横線
    for (let i = 0; i < canvas.height + 1; i++) {
      this._context.moveTo(0, (i * (canvas.height / 20)));
      this._context.lineTo(canvas.width, (i * (canvas.height / 20)));
      this._context.stroke();
    }
    // 終了処理
    this._context.moveTo(0, 0);
  }

  get context(): CanvasRenderingContext2D | null {
    return this._context;
  }
}

const initCanvas = (): void => {
  const canvas: HTMLCanvasElement | null = document.querySelector('#lifegame');
  if (canvas) new Lifegame(canvas);
};

window.onload = () => {
  initCanvas();
};