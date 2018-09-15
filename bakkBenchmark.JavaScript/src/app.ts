
function run() {
    const printCSV = false;
    const worker = new Worker('./Program.js');

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
    console.log(`Q1      ${res.q1.toFixed(5)}`);
    console.log(`Median  ${res.median.toFixed(5)}`);
    console.log(`Q3      ${res.q3.toFixed(5)}`);
    console.log(`Mode    ${res.mode.toFixed(5)}`);
    console.log(`L. Out. ${res.lowerOutliers.toFixed(5)}`);
    console.log(`U. Out. ${res.upperOutliers.toFixed(5)}`);
    console.log(`Avg.    ${res.avg.toFixed(5)}`);
    console.log(`StDev.  ${res.stDev.toFixed(5)}`);
}
