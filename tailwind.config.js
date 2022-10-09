/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			visibility: ['group-hover'],
			brightness: {
				25: '.25',
			},
		},
		fontFamily: {
			montserrat: ['Montserrat'],
		},
	},
	plugins: [],
};
