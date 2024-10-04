import * as Bull from "bull";
export declare const jobProcessor: (bullJob: Bull.Job<any>) => Promise<any>;
