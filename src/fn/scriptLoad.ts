/**
 * JSファイルをscriptタグを利用して読み込む
 *
 * @version 1.0.0
 * @since 1.0.0
 * @param scriptFile scriptファイル
 * @return ランダムに入れ替えられた配列
 *
 */
export default async function scriptLoad (scriptFile: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const tag = document.createElement('script');
		document.head.appendChild(tag);
		tag.async = true;
		tag.src = scriptFile;
		tag.addEventListener('load', () => {
			resolve();
		});
		tag.addEventListener('error', (e: ErrorEvent) => {
			reject(e);
		});
	});
}
