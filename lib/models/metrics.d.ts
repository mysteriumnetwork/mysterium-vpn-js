export interface Metrics {
    connectCount: {
        success: number;
        fail: number;
        timeout: number;
    };
}
