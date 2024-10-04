"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bull = require("bull");
var queue_extras_1 = require("./queue.extras");
var job_processor_1 = require("./jobs/job.processor");
var QueueService = /** @class */ (function () {
    function QueueService(libOptions, config) {
        this.MAIN_QUEUE = "mq";
        this._queues = {};
        this.PROCESS_COUNT = config.processCount;
        var mainQueue = new Bull(config.appIdentifier + "_" + this.MAIN_QUEUE, libOptions);
        // Starting the main queue worker.
        mainQueue.process(this.PROCESS_COUNT, job_processor_1.jobProcessor);
        this._queues[this.MAIN_QUEUE] = mainQueue;
    }
    QueueService.init = function (options, config) {
        return new QueueService(options, config);
    };
    QueueService.prototype.createQueue = function (queueName, libOptions, config) {
        if (queueName === this.MAIN_QUEUE) {
            throw queue_extras_1.QueueError.RESERVED_NAME;
        }
        if (this._queues[queueName]) {
            throw queue_extras_1.QueueError.QUEUE_EXISTS;
        }
        var fullName = config.appIdentifier + "_" + queueName;
        var newQueue = new Bull(fullName, libOptions);
        // Starting the main queue worker.
        newQueue.process(config.processCount, job_processor_1.jobProcessor);
        this._queues[queueName] = newQueue;
    };
    QueueService.prototype.getJob = function (jobId, queueName) {
        var finalQueueName = queueName || this.MAIN_QUEUE;
        var queue = this._queues[finalQueueName];
        if (!queue) {
            throw queue_extras_1.QueueError.QUEUE_DOESNT_EXIST;
        }
        return queue.getJob(jobId);
    };
    QueueService.prototype.dispatch = function (job, queueName, options) {
        var finalQueueName = queueName || this.MAIN_QUEUE;
        var queue = this._queues[finalQueueName];
        if (!queue) {
            throw queue_extras_1.QueueError.QUEUE_DOESNT_EXIST;
        }
        return queue.add({
            serialised: JSON.stringify(job)
        }, options);
    };
    return QueueService;
}());
exports.QueueService = QueueService;
//# sourceMappingURL=queue.service.js.map