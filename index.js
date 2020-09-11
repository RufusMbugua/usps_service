'use strict'

const https = require('https');

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */

exports.handler = async (event) => {
    let dataSet = await authorize()

    let access_token = dataSet.access_token
    let payload = JSON.stringify(buildPayload(event))
    console.log(payload)
    let dataString = ''

    const response = await new Promise((resolve, reject) => {
    
        const req = https.request(options, function (res) {
            res.on('data', chunk => {
                dataString += chunk;
            });
            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    body: dataString
                });
            });
        });

        req.on('error', (e) => {
            reject({
                statusCode: 500,
                body: 'Something went wrong!'
            });
        });
        req.write(payload)
        req.end()
    });

    return response;
};