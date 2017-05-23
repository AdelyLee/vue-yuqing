
/**
 * Created by lyc on 17-5-22.
 */
var http = require('http');
var builder = require('./BriefingBuilder.js');
var service = require('../../../../../src/vuex/module/node/decisionReport.js');

http.get('http://localhost:8090/static/api/briefing.json', (res) => {
    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` +
            `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
            `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.log(error.message);
        // consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        try {
            let briefingObj = JSON.parse(rawData);
            // 处理数据

            briefingObj = mikeBriefing(briefingObj);

            // builder.briefingDirector.createBriefing(briefingObj);
            // var test = builder.briefingBuilder;
            // var item = test.briefing;
            //
            console.log(JSON.stringify(briefingObj));

        } catch (e) {
            console.log(e.message);
        }
    });
}).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});

function mikeBriefing(briefingObj) {
    var briefingBodyArray = briefingObj.briefingBody;
    var briefingBody = [];
    for (var item of briefingBodyArray) {
        briefingBody.push(mikeBriefingCell(item));
    }

    briefingObj.briefingBody = briefingBody;

    return briefingObj;
}

function mikeBriefingCell(briefingCellObj) {
    var briefingCellChildren = briefingCellObj.children;
    var briefingCells = [];
    for (var item of briefingCellChildren) {
        briefingCells.push(mikeBriefingCell(item));
    }
    // 获取数据
    var method = briefingCellObj.method;
    service[method]().then(function (json) {
        option =  json;
        // TODO: handler the data

    }, function (error) {
        console.error('出错了', error);
    });
    briefingCellObj.option = {};
    briefingCellObj.children = briefingCells;

    return briefingCellObj;
}

