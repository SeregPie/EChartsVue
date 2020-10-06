import {terser} from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

import {main} from './package.json';

let globals = {
	'@seregpie/vue-resize-sensor': 'VueResizeSensor',
	'echarts/lib/echarts': 'echarts',
	'vue-demi': 'VueDemi',
};

export default {
	external: Object.keys(globals),
	input: 'src/index.js',
	plugins: [
		babel({
			babelHelpers: 'bundled',
			presets: ['@babel/preset-env'],
		}),
		terser(),
	],
	output: {
		file: main,
		format: 'umd',
		name: 'EChartsVue',
		globals,
	},
};