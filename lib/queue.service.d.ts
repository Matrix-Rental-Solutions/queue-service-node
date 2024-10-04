import * as Bull from "bull";
import { QueueConfig } from "./queue.extras";
import { JobAbstract } from "./jobs/job.abstract";
export declare class QueueService {
    private readonly MAIN_QUEUE;
    private readonly PROCESS_COUNT;
    private _queues;
    private constructor();
    static init(options: Bull.QueueOptions, config: QueueConfig): QueueService;
    createQueue(queueName: string, libOptions: Bull.QueueOptions, config: QueueConfig): void;
    getJob(jobId: Bull.JobId, queueName?: string): Promise<Bull.Job<any>>;
    dispatch(job: JobAbstract, queueName?: string, options?: Bull.JobOptions): Promise<Bull.Job<any>>;
}
