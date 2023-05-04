const loadScript = (url: string) =>
	new Promise<Event>((resolve, reject) => {
		const script = document.createElement('script');
		script.src = url;
		script.async = true;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});

export const loadScriptOnce = (() => {
	const loaded: string[] = [];
	return async function (url: string) {
		if (!loaded.includes(url)) {
			await loadScript(url);
			loaded.push(url);
			return true;
		} else {
			return true;
		}
	};
})();

const loadStyles = (url: string) =>
	new Promise<Event>((resolve, reject) => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = url;
		link.onload = resolve;
		link.onerror = reject;
		document.head.appendChild(link);
	});

export const loadStylesOnce = (() => {
	let loaded: string[] = [];
	return async function (url: string) {
		if (!loaded.includes(url)) {
			await loadStyles(url);
			loaded = [url];
			return true;
		} else {
			return true;
		}
	};
})();
