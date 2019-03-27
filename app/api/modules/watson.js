const AssistantV2 = require('watson-developer-cloud/assistant/v2');

const service = new AssistantV2({
    version: process.env.ASSISTANT_VERSION,
    iam_apikey: process.env.ASSISTANT_APIKEY,
    url: process.env.ASSISTANT_URL
});

exports.create_session = function() {
    return new Promise((resolve, reject) => {
        service.createSession({
            assistant_id: process.env.ASSISTANT_ID,
        }, function(err, response) {
            if (err) {
                console.log('error:', err);
                reject(err);
            } else{
                console.log(JSON.stringify(response, null, 2));
                resolve(response);
            }
        });
    });
};


exports.delete_session = function(session_id) {
    return new Promise((resolve, reject) => {
        service.deleteSession({
            assistant_id: process.env.ASSISTANT_ID,
            session_id: session_id,
        }, function(err, response) {
            if (err) {
                console.log('error:', err);
                reject(err);
            } else{
                console.log(JSON.stringify(response, null, 2));
                resolve(response);
            }
        });
    });
};

exports.message = function(text, session_id) {
    return new Promise((resolve, reject) => {
        service.message({
            assistant_id: process.env.ASSISTANT_ID,
            session_id: session_id,
            input: {
                'message_type': 'text',
                'text': text}
        }, function(err, response) {
            if (err) {
                console.log('error:', err);
                reject(err);
            } else {
                console.log(JSON.stringify(response, null, 2));
                resolve(response);
            }
        });
    });
};