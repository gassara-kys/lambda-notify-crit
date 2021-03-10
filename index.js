const https = require('https');
const url = require('url');
const slack_url = process.env.WEB_HOOK_URL;
const slack_req_opts = url.parse(slack_url);
slack_req_opts.method = 'POST';
slack_req_opts.headers = {'Content-Type': 'application/json'};

exports.handler = function (event, context) {
    var req = https.request(slack_req_opts, function (res) {
        if (res.statusCode === 200) {
            context.succeed('posted to slack');
        } else {
            context.fail('status code: ' + res.statusCode);
        }
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
        context.fail(e.message);
    });

    req.write(JSON.stringify({text: "<!channel> CRIT"}));
    req.end();
};

