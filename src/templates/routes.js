// consult https://router.vuejs.org/en/index.html
export default [
	{
		path: '/',
		component: require('views/commons/home')
	},
	{
		path: '*',
		component: require('views/commons/404')
	}
];