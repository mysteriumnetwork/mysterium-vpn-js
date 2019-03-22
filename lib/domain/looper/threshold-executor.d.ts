/**
 * Executes given function and sleeps for remaining time.
 * If .cancel() is invoked, than sleep is skipped after function finishes.
 */
export declare class ThresholdExecutor {
    private func;
    private threshold;
    private errorCallback?;
    private canceled;
    constructor(func: () => Promise<any>, threshold: number, errorCallback?: ((err: Error) => any) | undefined);
    /**
     * Executes given function and sleeps for remaining time, if .cancel() was not invoked.
     * @returns {Promise<void>}
     */
    execute(): Promise<void>;
    /**
     * Forces currently function execution to skip sleep.
     */
    cancel(): void;
    private executeFunction;
    private sleepRemainingTime;
    private _remainingSleepTime;
}
