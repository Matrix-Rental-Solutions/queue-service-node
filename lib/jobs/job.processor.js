"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobProcessor = function (bullJob) {
    var jobData = JSON.parse(bullJob.data.serialised);
    var jobObj = Object.assign(new (require(jobData["classPath"])[jobData["className"]]), jobData);
    return jobObj.handle();
};
//# sourceMappingURL=job.processor.js.map