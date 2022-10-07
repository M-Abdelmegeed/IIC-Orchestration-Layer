const getUserName = require("./getUserName");

const greeting = async (message, username) => {
    //const username = await getUserName();
    const result = message.replace('XX_userName_XX', username);
    return result;
}

module.exports = greeting