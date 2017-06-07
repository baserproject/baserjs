// for module "bezier-easing"

declare module "bezier-easing" {
	function BezierEasing (mX1: number, mY1: number, mX2: number, mY2: number): BezierEasing.Easing;
	namespace BezierEasing {
		export interface Easing {
			(x: number): number;
		}
	}
	export = BezierEasing;
}

// for Classes/YouTube.ts
interface Window {
	onYouTubeIframeAPIReady?: () => void;
}
