import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			screens: {
				"lt-lg": { max: defaultTheme.screens.lg },
			}
		}
	},
	plugins: [import("flowbite/plugin")],
};
