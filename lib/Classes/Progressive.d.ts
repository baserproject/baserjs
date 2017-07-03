export default class Progressive {
    private _handler;
    private _startTimestamp;
    private _rate;
    private _pause;
    private _rafId;
    constructor(handler: (rate: number) => void);
    start(duration: number): Promise<void>;
    pause(): void;
    stop(): void;
    private _progress(initRate, duration);
}
