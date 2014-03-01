var highland = require('highland');

function runOperation(operation, resources) {
    var resourcesStream = highland([resources]).flatten();
    var executions = highland([resourcesStream]);
    var output = operation(executions);

    return {
        resources: output.flatMap(function(executions) {
            return executions;
        })
    };
}


module.exports = {
    runOperation: runOperation
};
