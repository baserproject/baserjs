module baser {

	export module ui {

		export interface IEventDispacher {

			on (type: string, handler: Function): IEventDispacher;
			off (type?: string): IEventDispacher;
			trigger (type: string, args?: any[], context?: any): IEventDispacher;

		}

	}

}