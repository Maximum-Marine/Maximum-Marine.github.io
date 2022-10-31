module.exports = {
	globDirectory: '_site/',
	globPatterns: [
		'**/*.{html,css,json,xml,avif,jpeg,webp,png,jpg,js,mjs,webm,mp4}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: '_site/service-worker.js'
};