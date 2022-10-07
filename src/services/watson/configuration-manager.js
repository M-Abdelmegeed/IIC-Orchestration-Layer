"use strict";
//in case no VCAP_APPLICATION, use the DEBUG appName;
var configurationFolder = "../../conf";

module.exports.getConfiguration = function (name) {
	var configurationFile = configurationFolder + "/" + name + ".json";
	console.log("reading " + name + " from " + configurationFile);
	return require(configurationFile);
};
