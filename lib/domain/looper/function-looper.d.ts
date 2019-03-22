export declare class FunctionLooper {
    private func;
    private threshold;
    private running;
    private errorPublisher;
    private currentExecutor?;
    private currentPromise?;
    constructor(func: () => Promise<any>, threshold: number);
    start(): void;
    stop(): Promise<void>;
    isRunning(): boolean;
    onFunctionError(callback: (err: Error) => void): void;
    private waitForStartedPromise;
    private reportError;
}
