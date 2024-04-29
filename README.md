# About This Fork
This repository is a fork of the original maplibre-contour project. This version extends the original by adding support for PNG Elevation Tile.

# About PNG Elevation Tile
PNG Elevation Tile is a format for elevation data designed for use in web browsers, proposed by Geological Survey of Japan, AIST.

To obtain the elevation value h from the RGB values of a PNG elevation tile pixel (R, G, B = 0–255):
x = 2<sup>16</sup>R + 2<sup>8</sup>G + B
Using elevation resolution u:
- if x < 2<sup>23</sup>: h = xu
- if x = 2<sup>23</sup>: h = NA
- if x > 2<sup>23</sup>: h = (x-2<sup>24</sup>)u

Invalid values are represented by (R, G, B) = (128, 0, 0).

In case of u = 0.01m, the range of -83,886.07m to +83,886.07m is represented, adequately covering elevations such as Mount Everest (8,849m) and the Mariana Trench Challenger Deep (-10,920m).

For more detailed information, please refer to the following article.
https://www.jstage.jst.go.jp/article/geoinformatics/26/4/26_155/_article/-char/en

# How to Use
To use it, import as an ES6 module: 
`npm add git+https://github.com/qchizu/maplibre-contour-adding-PNG-Elevation-Tile.git`

```js
import mlcontour from "maplibre-contour";
```
or
```js
import mlcontour from "maplibre-contour";
```
Then, to use PNG Elevation Tile, set up demSource with MapLibre, specifying encoding: "gsj":

```js
var demSource = new mlcontour.DemSource({
  url: "https://tiles.gsj.jp/tiles/elev/mixed/{z}/{y}/{x}.png",
  encoding: "gsj", // "mapbox", "terrarium" or "gsj" default="terrarium"
  maxzoom: 13,
  worker: true, // offload isoline computation to a web worker to reduce jank
  cacheSize: 100, // number of most-recent tiles to cache
  timeoutMs: 10_000, // timeout on fetch requests
});
demSource.setupMaplibre(maplibregl);
```

The rest of the usage instructions are the same as the original project.

# License
This project inherits the license of the original maplibre-contour project. See the LICENSE file for more details.

---

# このフォークについて
このリポジトリは、maplibre-contourプロジェクトのフォークで、PNG標高タイルが利用できるようになっています。

# PNG標高タイルについて
PNG標高タイルは、標高データをWebブラウザで使用するためのフォーマットで、日本の産業技術総合研究所シームレス地質情報研究グループが提案しています。
PNG標高タイルの画素のRGB値（R, G, B = 0～255）から標高値hを取得する方法：
x = 2<sup>16</sup>R + 2<sup>8</sup>G + B
uを標高分解能として:
- x < 2<sup>23</sup>の場合: h = xu
- x = 2<sup>23</sup>の場合: h = NA
- x > 2<sup>23</sup>の場合: h = (x-2<sup>24</sup>)u

無効値は (R, G, B) = (128, 0, 0)。

標高分解能u = 0.01mの場合、-83,886.07mから+83,886.07mまでの範囲を表すことができ、エベレスト（8,849m）やマリアナ海溝チャレンジャー海淵（-10,920m）などの標高を十分に表現できます。

詳細な情報は以下をご覧ください。
https://www.jstage.jst.go.jp/article/geoinformatics/26/4/26_155/_article/-char/ja

# 使用方法
以下のようにインポートします。
`npm add git+https://github.com/qchizu/maplibre-contour-adding-PNG-Elevation-Tile.git`

```js
import mlcontour from "maplibre-contour";
```
または、
```js
import mlcontour from '../node_modules/maplibre-contour/dist/index'
```

そして、PNG標高タイルを利用するには、demSourceをMapLibreにセットする際に、encodingを"gsj"と指定します。

例：
```js
var demSource = new mlcontour.DemSource({
  url: "https://tiles.gsj.jp/tiles/elev/mixed/{z}/{y}/{x}.png",
  encoding: "gsj", // "mapbox", "terrarium" or "gsj" default="terrarium"
  maxzoom: 13,
  worker: true, // offload isoline computation to a web worker to reduce jank
  cacheSize: 100, // number of most-recent tiles to cache
  timeoutMs: 10_000, // timeout on fetch requests
});
demSource.setupMaplibre(maplibregl);
```

他の使用方法は、もとのプロジェクトと同一です。

# ライセンス
このプロジェクトは、元のmaplibre-contourプロジェクトのライセンスを継承します。詳細はLICENSEファイルを参照してください。

# メモ - Memo (Japanese Only)
- 変更点
  - src\decode-image.ts
  encoding: "gsj"を追加
  - package.json
  Windowsで動作するよう（buildできるよう）、
    - rm -rfをrimrafに置換
    - rimrafパッケージをインストール
    npm install rimraf --save-dev
    - Windowsのファイルパスで使用できない文字を回避するため変更
    "generate-types": "tsc --emitDeclarationOnly --declaration --outDir dist"
    この変更に伴い、distディレクトリ内の.test.d.ts、-jest.d.tsで終わるすべてのファイルは手動で削除すること

- 手順
  1. src内のファイルを編集
  2. npm run build
  3. distディレクトリ内の.test.d.ts、-jest.d.tsで終わるすべてのファイルを手動で削除
  4. GitHubに追加

---
# maplibre-contour

maplibre-contour is a plugin to render contour lines in [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js) from `raster-dem` sources that powers the terrain mode for [onthegomap.com](https://onthegomap.com).

![Topographic map of Mount Washington](demo.png)

[Live example](https://onthegomap.github.io/maplibre-contour) | [Code](./index.html)

To use it, import the [maplibre-contour](https://www.npmjs.com/package/maplibre-contour) package with a script tag:

```html
<script src="https://unpkg.com/maplibre-contour@0.0.7/dist/index.min.js"></script>
```

Or as an ES6 module: `npm add maplibre-contour`

```js
import mlcontour from "maplibre-contour";
```

Then to use, first create a `DemSource` and register it with maplibre:

```js
var demSource = new mlcontour.DemSource({
  url: "https://url/of/dem/source/{z}/{x}/{y}.png",
  encoding: "terrarium", // "mapbox" or "terrarium" default="terrarium"
  maxzoom: 13,
  worker: true, // offload isoline computation to a web worker to reduce jank
  cacheSize: 100, // number of most-recent tiles to cache
  timeoutMs: 10_000, // timeout on fetch requests
});
demSource.setupMaplibre(maplibregl);
```

Then configure a new contour source and add it to your map:

```js
map.addSource("contour-source", {
  type: "vector",
  tiles: [
    demSource.contourProtocolUrl({
      // convert meters to feet, default=1 for meters
      multiplier: 3.28084,
      thresholds: {
        // zoom: [minor, major]
        11: [200, 1000],
        12: [100, 500],
        14: [50, 200],
        15: [20, 100],
      },
      // optional, override vector tile parameters:
      contourLayer: "contours",
      elevationKey: "ele",
      levelKey: "level",
      extent: 4096,
      buffer: 1,
    }),
  ],
  maxzoom: 15,
});
```

Then add contour line and label layers:

```js
map.addLayer({
  id: "contour-lines",
  type: "line",
  source: "contour-source",
  "source-layer": "contours",
  paint: {
    "line-color": "rgba(0,0,0, 50%)",
    // level = highest index in thresholds array the elevation is a multiple of
    "line-width": ["match", ["get", "level"], 1, 1, 0.5],
  },
});
map.addLayer({
  id: "contour-labels",
  type: "symbol",
  source: "contour-source",
  "source-layer": "contours",
  filter: [">", ["get", "level"], 0],
  layout: {
    "symbol-placement": "line",
    "text-size": 10,
    "text-field": ["concat", ["number-format", ["get", "ele"], {}], "'"],
    "text-font": ["Noto Sans Bold"],
  },
  paint: {
    "text-halo-color": "white",
    "text-halo-width": 1,
  },
});
```

You can also share the cached tiles with other maplibre sources that need elevation data:

```js
map.addSource("dem", {
  type: "raster-dem",
  encoding: "terrarium",
  tiles: [demSource.sharedDemProtocolUrl],
  maxzoom: 13,
  tileSize: 256,
});
```

# How it works

<img src="architecture.png" width="500">

[`DemSource.setupMaplibre`](./src/dem-source.ts) uses MapLibre's [`addProtocol`](https://maplibre.org/maplibre-gl-js-docs/api/properties/#addprotocol) utility to register a callback to provide vector tile for the contours source. Each time maplibre requests a vector tile:

- [`DemManager`](./src/dem-manager.ts) fetches (and caches) the raster-dem image tile and its neighbors so that contours are continuous across tile boundaries.
  - When `DemSource` is configured with `worker: true`, it uses [`RemoteDemManager`](./src/remote-dem-manager.ts) to spawn [`worker.ts`](./src/worker.ts) in a web worker. The web worker runs [`LocalDemManager`](./src/dem-manager.ts) locally and uses the [`Actor`](./src/actor.ts) utility to send cancelable requests and responses between the main and worker thread.
- [`decode-image.ts`](./src/decode-image.ts) decodes the raster-dem image RGB values to meters above sea level for each pixel in the tile.
- [`HeightTile`](./src/height-tile.ts) stitches those raw DEM tiles into a "virtual tile" that contains the border of neighboring tiles, aligns elevation measurements to the tile grid, and smooths the elevation measurements.
- [`isoline.ts`](./src/isolines.ts) generates contour isolines from a `HeightTile` using a marching-squares implementation derived from [d3-contour](https://github.com/d3/d3-contour).
- [`vtpbf.ts`](./src/vtpbf.ts) encodes the contour isolines as mapbox vector tile bytes.

MapLibre sends that vector tile to its own worker, decodes it, and renders as if it had been generated by a server.

# Why?

There are a lot of parameters you can tweak when generating contour lines from elevation data like units, thresholds, and smoothing parameters. Pre-generated contour vector tiles require 100+gb of storage for each variation you want to generate and host. Generating them on-the-fly in the browser gives infinite control over the variations you can use on a map from the same source of raw elevation data that maplibre uses to render hillshade.

# License

maplibre-contour is licensed under the [BSD 3-Clause License](LICENSE). It includes code adapted from:

- [d3-contour](https://github.com/d3/d3-contour) (ISC license)
- [vt-pbf](https://github.com/mapbox/vt-pbf) (MIT license)
