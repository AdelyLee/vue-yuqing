
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

            briefingObj.briefingBody = mikeBriefingBody();



            // builder.briefingDirector.createBriefing(briefingObj);
            // var test = builder.briefingBuilder;
            // var item = test.briefing;
            //
            // console.log(JSON.stringify(item));

        } catch (e) {
            console.log(e.message);
        }
    });
}).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});

function mikeBriefingBody() {
    var briefingBody = [];
    var briefingCell = mikeBriefingCell();
    briefingCell.title = "";

    return briefingBody;
}

function mikeBriefingCell() {
    var briefingCell = {};
    briefingCell.title = "";

    return briefingCell;
}

