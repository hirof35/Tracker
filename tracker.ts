// 二次元座標インターフェース
interface Point2D {
    x: number;
    y: number;
  }
  
  // 追跡対象（ターゲット）のクラス
  class Target {
    public position: Point2D;
  
    constructor(x: number, y: number) {
      this.position = { x, y };
    }
  
    // ターゲットをランダムに移動させる
    public updatePosition(): void {
      const moveX = (Math.random() - 0.5) * 4;
      const moveY = (Math.random() - 0.5) * 4;
      this.position.x += moveX;
      this.position.y += moveY;
    }
  }
  
  // 追跡者（トラッカー）のクラス
  class Tracker {
    public position: Point2D;
    private speed: number;
  
    constructor(x: number, y: number, speed: number) {
      this.position = { x, y };
      this.speed = speed;
    }
  
    public follow(targetPosition: Point2D): void {
      const dx = targetPosition.x - this.position.x;
      const dy = targetPosition.y - this.position.y;
      const distance = Math.hypot(dx, dy);
  
      if (distance < 0.1) return;
  
      const step = Math.min(this.speed, distance);
      const vx = (dx / distance) * step;
      const vy = (dy / distance) * step;
  
      this.position.x += vx;
      this.position.y += vy;
    }
  }
  
  // コンソールUI描画クラス
  class ConsoleRenderer {
    private width: number;
    private height: number;
  
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
  
    public render(target: Point2D, tracker: Point2D, isCaught: boolean): void {
      console.clear();
      console.log("=== TypeScript 追跡アルゴリズム シミュレーション ===");
      console.log("T: Target (逃げる対象)  |  A: Agent (追跡者)");
      console.log("--------------------------------------------------");
  
      const grid: string[][] = Array.from({ length: this.height }, () =>
        Array(this.width).fill(" . ")
      );
  
      const tX = Math.min(Math.max(0, Math.floor(target.x)), this.width - 1);
      const tY = Math.min(Math.max(0, Math.floor(target.y)), this.height - 1);
      const aX = Math.min(Math.max(0, Math.floor(tracker.x)), this.width - 1);
      const aY = Math.min(Math.max(0, Math.floor(tracker.y)), this.height - 1);
  
      grid[tY][tX] = " T ";
      grid[aY][aX] = isCaught ? " X " : " A ";
  
      grid.forEach((row) => console.log(row.join("")));
  
      const dist = Math.hypot(target.x - tracker.x, target.y - tracker.y);
      console.log("--------------------------------------------------");
      console.log(`ターゲット位置 : (${target.x.toFixed(2)}, ${target.y.toFixed(2)})`);
      console.log(`追跡者位置     : (${tracker.x.toFixed(2)}, ${tracker.y.toFixed(2)})`);
      console.log(`距離           : ${dist.toFixed(2)}`);
  
      if (isCaught) {
        console.log("\n==================================================");
        console.log("  💥 捕獲成功！ターゲットを追跡・確保しました。");
        console.log("==================================================");
      }
    }
  }
  
  // メインの実行処理
  function runSimulation(): void {
    const target = new Target(15, 10);
    const tracker = new Tracker(2, 2, 0.8);
    const renderer = new ConsoleRenderer(20, 10);
    
    // 衝突判定のしきい値（距離がこの値以下になると確保）
    const CATCH_DISTANCE = 0.8;
  
    const timer = setInterval(() => {
      target.updatePosition();
      tracker.follow(target.position);
  
      // 距離の計算
      const distance = Math.hypot(
        target.position.x - tracker.position.x,
        target.position.y - tracker.position.y
      );
  
      // 衝突判定
      const isCaught = distance <= CATCH_DISTANCE;
  
      renderer.render(target.position, tracker.position, isCaught);
  
      // ぶつかったらタイマーを停止してシミュレーション終了
      if (isCaught) {
        clearInterval(timer);
      }
    }, 100);
  }
  
  runSimulation();