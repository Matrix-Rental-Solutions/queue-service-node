export declare abstract class JobAbstract {
    abstract classPath: string;
    private className;
    constructor();
    abstract handle(): Promise<any>;
}
