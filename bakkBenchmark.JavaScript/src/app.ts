
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

            console.log("----------------------------------------------");

            console.log(`Q1     ${data.calcResult.q1.toFixed(5)}`);
            console.log(`Median ${data.calcResult.median.toFixed(5)}`);
            console.log(`Q3     ${data.calcResult.q3.toFixed(5)}`);
            console.log(`Avg.   ${data.calcResult.avg.toFixed(5)}`);
            console.log(`StDev. ${data.calcResult.stDev.toFixed(5)}`);
        } else {
            console.log(`${data.generate.toFixed(2)},${data.sequence.toFixed(2)},${data.sort.toFixed(2)},${data.calculate.toFixed(2)}`);
        }
    }, false);
}