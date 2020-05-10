# Shuffle official website
![image](https://user-images.githubusercontent.com/43196286/81503525-ffe94100-931e-11ea-8f79-54ff371d2245.png)
同志社大学を拠点に活動するスノーボードサークルshuffleの公式webサイトです。  
https://www.shuffle-snowboarding.style/


## Get started

クローンして

```sh
npm install

```

開発環境は

```sh
npm run dev
```
で立ち上がります。


## 使用技術について

- Gatsby.js(https://www.gatsbyjs.org/)
- tailwindcss(https://tailwindcss.com/)
- microCms(https://microcms.io/)
- Netlify(https://www.netlify.com/)

### 開発においての留意事項

- tailwindcssを用いてスタイルを書いています。
  tailwindcssで補えない分のスタイルは./src/css/style.cssにあります。
  そのほかは基本的に普通のgatsbyjsで作るサイトです。

- headlessCMSにはmicroCmsを用いているのでgatsby-source-microcms(https://www.gatsbyjs.org/packages/gatsby-source-microcms/)プラグインを使用しています。

