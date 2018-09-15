export WASM_SDK=./WASM_SDK
rm -rf out
mkdir -p out
csc -target:library -optimize \
-out:out/Benchmark.dll \
../bakkBenchmark.DotNet/*.cs ../bakkBenchmark.DotNet.Console/Program.cs

mono $WASM_SDK/packager.exe out/Benchmark.dll -out=out
cp src/index.html out/index.html
python server.py