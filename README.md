# 力のはたらき ― インタラクティブ・シミュレーター

中学3年理科「力のはたらき」単元のためのインタラクティブ物理シミュレーター集です。
サーバー不要・純粋なHTML/CSS/JSのみで動作し、PWA（ホーム画面に追加してアプリのように使える）にも対応しています。

## 含まれるファイル

```
index.html          ホーム画面
cart.html            01 力のつり合い（台車・斜面）
pressure.html        02 大気圧と水圧
projectile.html      03 斜方投射
freefall.html        04 自由落下と空気抵抗
pendulum.html        05 振り子とニュートンのゆりかご
pulley.html          06 滑車の組み合わせ
styles.css           全ページ共通スタイル
manifest.json        PWA設定ファイル
sw.js                オフラインキャッシュ用サービスワーカー
icons/               アプリアイコン一式
```

## GitHub Pagesで公開する手順

### 1. リポジトリを作成する
1. GitHubにログインし、右上の「+」→「New repository」を選択
2. リポジトリ名を決める（例：`force-simulators`）。**Public**を選択
3. 「Create repository」をクリック（READMEなどは追加しなくてOK）

### 2. ファイルをアップロードする
最も簡単なのはブラウザから直接アップロードする方法です。

1. 作成したリポジトリのページで「uploading an existing file」というリンクをクリック
2. このフォルダ内の全ファイル・全フォルダ（`index.html`から`icons/`まで）をまとめてドラッグ＆ドロップ
3. 下部の「Commit changes」をクリック

（GitとGitHub CLIに慣れている場合は、下記でも同じことができます）
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/【ユーザー名】/【リポジトリ名】.git
git push -u origin main
```

### 3. GitHub Pagesを有効にする
1. リポジトリの「Settings」タブを開く
2. 左メニューの「Pages」を選択
3. 「Build and deployment」の「Source」を **Deploy from a branch** に設定
4. 「Branch」を **main** / **/(root)** に設定して「Save」
5. 数分待つと、ページ上部に公開URLが表示されます
   （例：`https://【ユーザー名】.github.io/【リポジトリ名】/`）

> **重要**：リポジトリのルートに `.nojekyll` という空ファイルを必ず置いてください。
> GitHub Pagesは既定でJekyllというツールを通して全ファイルを処理しますが、
> このファイルが無いと意図せずファイルの中身が書き換えられたり、
> 一部のページだけ正しく表示されなくなることがあります。
> `.nojekyll` は名前が `.` から始まるため、GitHubの「Upload files」画面では
> 見えにくいことがあります。アップロード後、リポジトリのファイル一覧に
> `.nojekyll` が表示されているか必ず確認してください。表示されていない場合は、
> リポジトリ画面の「Add file」→「Create new file」でファイル名に `.nojekyll`
> とだけ入力し、中身は空のままコミットしてください。

### 4. タブレットで「アプリ化」する
公開したURLをタブレットのブラウザで開き、

- **iPad（Safari）**：共有ボタン →「ホーム画面に追加」
- **Android タブレット（Chrome）**：メニュー →「ホーム画面に追加」／「アプリをインストール」

を行うと、ホーム画面にアプリのアイコンが追加され、ブラウザのアドレスバーなどが表示されない
全画面のアプリのような見た目で起動します（PWA）。一度開いたページはサービスワーカーにより
オフラインでも再度開けるようキャッシュされます。

## 更新のしかた

ファイルを修正したら、同じフォルダに再度アップロード（上書き）してコミットするだけで、
数分後には公開ページにも反映されます。

## 注意

- `manifest.json`の`start_url`はサイトのルート相対で `./index.html` に設定しています。
  リポジトリ名をサブパスとして公開する場合（`https://ユーザー名.github.io/リポジトリ名/`）でも、
  相対パスなのでそのまま動作します。
- 独自ドメインを使いたい場合は、GitHub Pagesの設定画面から「Custom domain」を設定してください。
