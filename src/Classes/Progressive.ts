const STOP = Symbol('Progressive.stop');

export default class Progressive {

	private _handler: (rate: number) => void;
	private _startTimestamp: number;
	private _rate = 0;
	private _pause: (() => void) | undefined;
	private _rafId: number;

	constructor (handler: (rate: number) => void) {
		this._handler = handler;
	}

	public async start (duration: number) {
		this._startTimestamp = Date.now();
		const initRate = this._rate;
		try {
			while (this._rate < 1) {
				this._rate = await this._progress(initRate, duration);
			}
			return Promise.resolve();
		} catch (e) {
			if (e === STOP) {
				return Promise.resolve();
			}
			throw e;
		}
	}

	public pause () {
		if (this._pause) {
			cancelAnimationFrame(this._rafId);
			this._pause();
		}
	}

	public stop () {
		if (this._pause) {
			this.pause();
			this._rate = 0;
			this._handler(0);
		}
	}

	private _progress (initRate: number, duration: number) {
		return new Promise<number>((resolve, reject) => {
			this._pause = () => reject(STOP);
			this._rafId = requestAnimationFrame(() => {
				const period = Date.now() - this._startTimestamp;
				const rate = Math.min(period / duration + initRate, 1);
				this._handler(rate);
				resolve(rate);
			});
		});
	}

}
