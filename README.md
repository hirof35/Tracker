
#2D Tracker Console AppTypeScriptで記述された、2次元平面上のターゲットをエージェント（追跡者）がリアルタイムに追跡するコンソールアプリケーションです。
概要このプログラムは、比例制御（P制御）を応用したシンプルな追跡アルゴリズムの動作をコンソール画面上でシミュレートします。
ランダムに移動するターゲット（T）に対し、追跡者（A）が向きを更新しながら距離を縮めていきます。
追跡者がターゲットに一定距離まで接近すると衝突（X）と判定し、シミュレーションが終了します。
主な機能リアルタイムシミュレーション: setInterval によるフレーム単位の更新と描画ベクトルによる追跡制御: ターゲットとの距離と方向を計算し、なめらかに移動グリッドUI描画: コンソール上に2Dマップとリアルタイムステータスを表示衝突検知と終了処理: 追跡完了時の自動停止と判定メッセージ出力動作環境Node.js: v18 移行（v22 推奨）TypeScript: v5.x 移行インストール & セットアップリポジトリをローカルにクローン（またはダウンロード）します。
依存関係（TypeScript等）をインストールします。Bashnpm install
実行方法推奨: tsx による直接実行Node.js環境でTypeScriptを直接実行するために tsx を使用します。Bashnpx tsx tracker.ts
代替: Node.js (v22以降) のネイティブ実行Bashnode --experimental-strip-types tracker.ts
コンソール画面の記号について記号意味TTarget: 逃避行動をとるターゲットAAgent: ターゲットを追跡するエージェントXCaught: エージェントがターゲットを捉えた位置.空白のグリッド領域クラス構造Target: ターゲットの位置保持およびランダム移動ロジックTracker: ターゲット座標を受け取り、指定された速度で位置を更新する追跡ロジックConsoleRenderer: コンソール画面のクリアとグリッド・ステータス情報の描画runSimulation(): メインループの制御および衝突検出判定<img width="727" height="507" alt="スクリーンショット 2026-09-03 124928" src="https://github.com/user-attachments/assets/69f43dbb-90e1-4a97-b2fb-db2eb6dbada1" />
<img width="727" height="507" alt="スクリーンショット 2026-09-03 124928" src="https://github.com/user-attachments/assets/bc16523f-c03d-488b-8463-f25f5f917815" />
