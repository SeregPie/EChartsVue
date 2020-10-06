import * as echarts from 'echarts/lib/echarts';
import {
	defineComponent,
	h,
	isVue2,
	onMounted,
	onUnmounted,
	ref,
	Vue,
	watchEffect,
} from 'vue-demi';
import VueResizeSensor from '@seregpie/vue-resize-sensor';

let component = defineComponent({
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
						...(isVue2
							? {
								ref: 'el',
							}
							: {
								ref: elRef,
							}
						),
					},
				)],
			);
		});
	},
});

if (isVue2 && globalThis.window) {
	Vue.component(component.name, component);
}

export default component;