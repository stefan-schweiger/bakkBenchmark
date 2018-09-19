
function run() {
    const printCSV = true;
    const worker = new Worker('./Benchmark.js');

    console.log("Running...");
    worker.postMessage("start");

    worker.addEventListener('message', function (e) {
        var data = JSON.parse(e.data);

        if (!printCSV) {        
            console.log(`Generate:  ${data.generate.toFixed(2)}ms`);
            console.log(`Sequence:  ${data.sequence.toFixed(2)}ms`);
            console.log(`Sort:      ${data.sort.toFixed(2)}ms`);
            console.log(`Calculate: ${data.calculate.toFixed(2)}ms`);
        } else {
            console.log(`${data.generate.toFixed(2)},${data.sequence.toFixed(2)},${data.sort.toFixed(2)},${data.calculate.toFixed(2)}`);
        }

        console.log("----------------------------------------------");
        printRes(data.resPolar);

        console.log("----------------------------------------------");
        printRes(data.resAcid);
    }, false);
}

function printRes(res: any) {
    console.log(`Q1      ${res.q1.toFixed(3)}`);
    console.log(`Median  ${res.median.toFixed(3)}`);
    console.log(`Q3      ${res.q3.toFixed(3)}`);
    console.log(`Mode    ${res.mode.toFixed(3)}`);
    console.log(`L. Out. ${res.lowerOutliers.toFixed(0)}`);
    console.log(`U. Out. ${res.upperOutliers.toFixed(0)}`);
    console.log(`Avg.    ${res.avg.toFixed(3)}`);
    console.log(`StDev.  ${res.stDev.toFixed(3)}`);
}
