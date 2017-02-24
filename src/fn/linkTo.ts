/**
 * 指定したURLへ移動する
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param href URI/URL/パス
 * @param blank
 *
 */
export default function linkTo (href: string, blank: boolean = false) {
	return () => {
		if (blank) {
			window.open(href);
		} else {
			location.href = href;
		}
	};
}
