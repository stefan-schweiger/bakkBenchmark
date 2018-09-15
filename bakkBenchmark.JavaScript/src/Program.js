importScripts(
    './DNAGenerator.js',
    './Sequencer.js',
    './Sort.js',
    './Calc.js',
    './Stopwatch.js'
);

const n = 500000;
const length = 100;

function benchmark() {
    const sw = new StopWatch();
    
    const res = {
        generate: 0,
        sequence: 0,
        sort: 0,
        calculate: 0,
        calcResult: null
    };

    debugger;

    sw.start();
    const seq = DNAGenerator.generate(n, length);
    sw.stop();

    res.generate = sw.elapsed;

    sw.start();
    const listPolar = Sequencer.sequenceMatchPolarity(seq);
    const listAcid = Sequencer.sequenceMatchAcidity(seq);
    sw.stop();

    res.sequence = sw.elapsed;

    sw.start();
    Sort.mergeSort(listPolar);
    Sort.mergeSort(listAcid);
    sw.stop();

    res.sort = sw.elapsed;

    sw.start();
    const resPolar = Calc.calculate(listPolar);
    const resAcid = Calc.calculate(listPolar);
    sw.stop();

    res.calculate = sw.elapsed;
    res.resPolar = resPolar;
    res.resAcid = resAcid;

    return res;
}

self.addEventListener('message', function() {
    const res = benchmark();

    self.postMessage(
        JSON.stringify(res)
    );

    self.close();
}, false);