mkdir -p out
dotnet build \
../bakkBenchmark.DotNet.Console/bakkBenchmark.DotNet.Console.csproj \
-c Release \
-o ../bakkBenchmark.DotNet.Interpreter/out
mono --interpreter out/bakkBenchmark.DotNet.Console.dll