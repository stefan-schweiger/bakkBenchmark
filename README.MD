# Current state of WebAssembly and mono-wasm Performance

## Benchmark Information

The Benchmark currently performs the following four tasks:

* Generate 500,000 random gene sequences with a length of 100 letters
* Transcribes the DNA to the resulting proteins and calculates the ratio of polar to nonpolar and basic to acidic proteins
* Separately sort the two resulting list of ratios by their values
* Calculates Q1, Median, Q3 and calculate average and standard deviation for those lists

## Platform Information

The Benchmark was implemented in the following languages/platforms:

* **C** → clang 6.0.1
* **C.Wasm** → emcc 1.38.6
* **JavaScript** → TypeScript 3.0.3
* **DotNet.Console** → .NET Core 2.1.300
* **DotNet.Interpreter** → Mono 5.14.0
* **DotNet.Wasm** → mono-wasm commit c211324 ($WASM_SDK variable needs to be set)

The .NET Projects where build with `Release` configuration and the C Projects with `-O3` optimizations.

## Results

The following results were recorded on a MacBook Pro (Retina, 15-inch, Late 2013) and where applicable Firefox 62.0 was used as the browser.

| Benchmark |      C |   C.Wasm | JavaScript | Dotnet.Console | Dotnet.Wasm | Dotnet.Interp |
|-----------|-------:|---------:|-----------:|---------------:|------------:|--------------:|
| Generate  | 524.59 |   675.80 |   2,618.96 |       1,255.88 |   27,111.15 |     10,499.93 |
| Sequence  | 312.56 |   429.70 |     600.79 |         371.23 |    6,872.21 |      2,164.94 |
| Sort      |  85.04 |   165.50 |     332.05 |         170.22 |    5,496.91 |      2,012.57 |
| Calculate |   3.49 |     4.40 |      12.14 |           6.74 |      386.21 |        129.05 |
|           | **925.69** | **1,275.40** | **3,563.94** | **1,804.08** | **39,866.47** | **14,806.49** |

<img alt="Benchmark Chart - Firefox" src="images/benchmark-overall-ff.png" width="860" />

### Detail Results

<img alt="Benchmark Chart - Generate - Firefox" src="images/benchmark-generate-ff.png" width="430" /> <img alt="Benchmark Chart - Sequence - Firefox" src="images/benchmark-sequence-ff.png" width="430" />
<img alt="Benchmark Chart - Sort - Firefox" src="images/benchmark-sort-ff.png" width="430" /> <img alt="Benchmark Chart - Calculate - Firefox" src="images/benchmark-calculate-ff.png" width="430" />

### Browser Results

<img alt="Benchmark Chart - Browser - Total" src="images/benchmark-browser-total.png" width="430" /> <img alt="Benchmark Chart - Browser - Relative" src="images/benchmark-browser-relative.png" width="430" />
