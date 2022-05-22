type StateObjectType = { [key in 'i' | 'x' | 'y' | 'clicked']: number };

class Lifegame {
  private _squaresCount = 20;
  // xとyは描画スタート位置
  private _squareStates: StateObjectType[] = [];
  protected _canvas: HTMLCanvasElement;
  protected _context: CanvasRenderingContext2D | null;
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._context = this._canvas.getContext('2d');
    if (!this._canvas || !this._context) throw new Error('invalid canvas');
    // canvas初期描画処理
    this.initCanvas();
    // events
    this._canvas.addEventListener('click', this.onClickCanvas);
    const startButton = document.querySelector('#startButton');
    startButton?.addEventListener('click', this.onClickStartButton);
    const clearButton = document.querySelector('#clearButton');
    clearButton?.addEventListener('click', this.onClickClearButton);
  }

  /* getter */
  get context(): CanvasRenderingContext2D | null {
    return this._context;
  }

  /* functions */

  /**
   * フレーム枠描画
   * @returns 
   */
  drawFrame = (): void => {
    if (!this._context) throw new Error('context is not found');
    // 枠描画
    this._context.beginPath();
    this._context.lineWidth = 2;
    this._context.strokeStyle = '#000000';
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
  };

  /**
   * 全部のマス目(20 x 20)を白で塗り潰し
   * @returns 
   */
  clearSquares = () => {
    if (!this._context) throw new Error('context is not found');
    // マス目状態管理配列クリア
    this._squareStates = [];
    this._context.moveTo(0, 0);
    this._context.fillStyle = '#ffffff';
    const squareWidth = this._canvas.width / this._squaresCount;
    const squareHeight = this._canvas.height / this._squaresCount;
    for (let i = 0; i < this._squaresCount; i++) {
      for (let ii = 0; ii < this._squaresCount; ii++) {
        const x = i === 0 ? this._context.lineWidth : i * squareWidth + this._context.lineWidth;
        const y = ii * squareHeight + this._context.lineWidth;
        const w = squareWidth - this._context.lineWidth;
        const h = squareHeight - this._context.lineWidth;
        this._context.fillRect(x, y, w, h);
        const drawStartX = Math.floor(this._canvas.width - ((this._squaresCount - i) * squareWidth));
        const drawStartY = Math.floor(this._canvas.height - ((this._squaresCount - ii) * squareHeight));
        this._squareStates.push({
          i: i + ii,
          x: drawStartX,
          y: drawStartY,
          clicked: 0
        })
      }
    }
  };

  /**
   * 罫線描画
   * @returns 
   */
  drawRuledLine = () => {
    if (!this._context) throw new Error('context is not found');
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
  };

  /**
   * Canvas全体のクリック処理
   * @param e 
   */
  onClickCanvas = (e: Event) => {
    if (!this._context) throw new Error('context is not found');
    const pe = e as PointerEvent;
    const clickedElement: HTMLElement = pe.target as HTMLElement;
    const rect = clickedElement.getBoundingClientRect();
    const x = pe.clientX - rect.left;
    const y = pe.clientY - rect.top;
    // console.log(`x: + ${x} y: + ${y}`);
    const rectWith = this._canvas.width / this._squaresCount;
    const rectHeight = this._canvas.height / this._squaresCount;
    // x座標が何番目のマスに当たるのか算出
    const xIndex = Math.floor(x / rectWith);
    const yIndex = Math.floor(y / rectHeight);
    // console.log(`xIndex: ${xIndex}, yIndex: ${yIndex}`);
    const drawStartX = Math.floor(this._canvas.width - ((this._squaresCount - xIndex) * rectWith));
    const drawStartY = Math.floor(this._canvas.height - ((this._squaresCount - yIndex) * rectHeight));
    // console.log(`drawStartX: ${drawStartX}, drawStartY: ${drawStartY}`);
    // 塗りつぶし処理
    this._context.strokeRect(drawStartX, drawStartY, rectWith, rectHeight);
    this._context.fillStyle = '#000000';
    this._context.fillRect(drawStartX, drawStartY, rectWith - 1, rectHeight - 1);

    // 状態管理更新
    const squareState = this._squareStates.find((state: StateObjectType) => state.x === drawStartX && state.y === drawStartY)
    if (!squareState) throw new Error('target square is not found.');
    squareState.clicked = 1;
  };

  /**
   * スタートボタン押下処理
   * @returns 
   */
  onClickStartButton = () => {
    if (!this._context) throw new Error('context is not found');
    // TODO setIntervalで面判定処理入れる
    // stateにclickedが1なら黒生存
  };

  /**
   * クリアボタン押下処理
   */
  onClickClearButton = () => {
    this.initCanvas();
  };

  initCanvas = () => {
    if (!this._context) throw new Error('context is not found');
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    // 一旦全体を白塗り
    this._context.fillStyle = '#ffffff';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    // フレーム枠描画
    this.drawFrame();
    // 全部のマス目(20 x 20)を白で塗り潰し
    this.clearSquares();
    // 縦横罫線描画
    this.drawRuledLine();
  };
}

const initCanvas = (): void => {
  const canvas: HTMLCanvasElement | null = document.querySelector('#lifegame');
  if (canvas) new Lifegame(canvas);
};

window.onload = () => {
  initCanvas();
};