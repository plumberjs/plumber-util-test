var Rx = require('plumber').Rx;

function runOperation(operation, resources) {
    // TODO: use pipeline assembly from core Plumber?
    var resourcesStream = Rx.Observable.fromArray(resources);
    var executions = Rx.Observable.return(resourcesStream);
    var output = operation(executions);

    return {
        resources: output.concatAll()
    };
}

function completeWithResources(resourcesObservable, callback, onError, onComplete) {
    resourcesObservable.toArray().subscribe(callback, onError, onComplete);
}

function runAndCompleteWith(operation, inputResources, callback, onError, onComplete) {
    var resourcesObs = runOperation(operation, inputResources).resources;
    completeWithResources(resourcesObs, callback, onError, onComplete);
}


module.exports = {
    runOperation: runOperation,
    completeWithResources: completeWithResources,
    runAndCompleteWith: runAndCompleteWith
};
