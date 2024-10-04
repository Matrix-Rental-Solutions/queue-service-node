export { QueueOptions } from "bull";
export interface QueueConfig {
    appIdentifier: string;
    processCount: number;
}
export interface CustomJob {
    className: string;
    classPath: string;
}
export declare enum QueueError {
    RESERVED_NAME = "RESERVED_NAME",
    QUEUE_EXISTS = "QUEUE_EXISTS",
    QUEUE_DOESNT_EXIST = "QUEUE_DOESNT_EXIST"
}
