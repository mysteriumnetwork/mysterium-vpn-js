declare type Unsubscribe = () => void;
/**
 * Allows subscribing callbacks and publishing data to them.
 */
export declare class Publisher<T> {
    private subscribers;
    addSubscriber(subscriber: (value: T) => any): Unsubscribe;
    removeSubscriber(subscriber: (value: T) => any): void;
    publish(data: T): void;
}
export {};
