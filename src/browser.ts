import * as baser from './';

interface WindowWithBaser extends Window {
	baser: typeof baser;
}

(window as WindowWithBaser).baser = baser;

