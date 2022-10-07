const waServiceManager = require("../watson/conversation-manager");

const createSession = async (req) => {
    const data = await waServiceManager.createSession(req).catch((e) => {
        console.error("Error: Couldn't Create Session");
        return { Error: e.message };
    });
    return data.session_id;
};

module.exports = createSession;