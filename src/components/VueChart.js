import * as echarts from 'echarts/core';
import {
	defineComponent,
	h,
	isVue2,
	onMounted,
	onUnmounted,
	ref,
	watchEffect,
} from 'vue-demi';
import VueResizeSensor from '@seregpie/vue-resize-sensor';

export default defineComponent({
	name: 'VueChart',
	props: {
		options: {
			type: Object,
			required: true,
		},
	},
	setup(props, {refs}) {
		let chart;
		let elRef = ref(null);
		onMounted(() => {
			let el = isVue2 ? refs.el : elRef.value;
			chart = echarts.init(el);
			watchEffect(() => {
				let {options} = props;
				chart.setOption(options, true);
			});
		});
		onUnmounted(() => {
			if (chart) {
				chart.dispose();
			}
		});
		let onResize = (() => {
			if (chart) {
				chart.resize();
			}
		});
		return (() => {
			return h(
				VueResizeSensor,
				{
					...(isVue2
						? {
							on: {
								resize: onResize,
							},
						}
						: {
							onResize,
						}
					),
				},
				[h(
					'div',
					{
						style: {
							height: '100%',
							position: 'absolute',
							width: '100%',
						},
						ref: isVue2 ? 'el' : elRef,
					},
				)],
			);
		});
	},
});
