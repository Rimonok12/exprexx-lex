const AWS = require('aws-sdk');

const callLex = async (userInput) => {
  try {
    const lex = new AWS.LexRuntime();
    const params = {
      botAlias: 'TestBotAlias',
      botName: 'BookATrip',
      inputText: userInput,
      userId: 'userId',
    };
    const response = await lex.postText(params).promise();
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.handler = async (event) => {
  const userInput = event.arguments.input;
  const lexResponse = await callLex(userInput);
  return {
    message: lexResponse.message,
    intentName: lexResponse.intentName,
    slots: lexResponse.slots,
  };
};
