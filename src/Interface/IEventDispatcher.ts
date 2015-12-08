interface IEventDispatcher {
	on (type: string, handler: Function): IEventDispatcher;
	off (type?: string): IEventDispatcher;
	trigger (type: string, args?: any[], context?: any): IEventDispatcher;
}

export = IEventDispatcher;
