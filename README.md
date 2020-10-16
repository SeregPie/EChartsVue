# EChartsVue

A simple wrapper for ECharts.

Works for Vue 2 & 3.

## dependencies

- [VueDemi](https://github.com/antfu/vue-demi)
- [VueResizeSensor](https://github.com/SeregPie/VueResizeSensor)

## setup

### npm

```shell
npm i @seregpie/echarts-vue
```

---

```js
import {VueChart} from '@seregpie/echarts-vue';
```

### browser

```html
<!-- if using Vue 2 -->
<script src="https://unpkg.com/vue@2"></script>
<script src="https://unpkg.com/@vue/composition-api"></script>

<!-- if using Vue 3 -->
<script src="https://unpkg.com/vue@3"></script>

<script src="https://unpkg.com/vue-demi"></script>
<script src="https://unpkg.com/@seregpie/vue-resize-sensor"></script>
<script src="https://unpkg.com/echarts@4/dist/echarts.min.js"></script>
<script src="https://unpkg.com/@seregpie/echarts-vue"></script>
```

The module is globally available as `EChartsVue`.

## usage

Register the component globally.

```javascript
import {createApp} from 'vue';
import {VueChart} from '@seregpie/echarts-vue';

let app = createApp({/*...*/});
app.component(VueChart.name, VueChart);
app.mount('body');
```

*or*

Register the component locally.

```javascript
import {VueChart} from '@seregpie/echarts-vue';

export default {
  components: {
    [VueChart.name]: VueChart,
  },
  // ...
};
```

---

```vue
<template>
  <vue-chart
    style="
      width: 600px;
      height: 400px;
    "
    :options="chartOptions"
  />
</template>
<script>
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';

export default {
  data() {
    return {
      products: [
        {name: 'shirt', sales: 5},
        {name: 'cardign', sales: 20},
        {name: 'chiffon shirt', sales: 36},
        {name: 'pants', sales: 10},
        {name: 'heels', sales: 10},
        {name: 'socks', sales: 20},
      ],
    };
  },
  computed: {
    chartOptions() {
      let {products} = this;
      return {
        title: {
          text: 'My Little Shop',
        },
        tooltip: {},
        xAxis: {
          data: products.map(({name}) => name),
        },
        yAxis: {},
        series: [{
          name: 'sales',
          data: products.map(({sales}) => sales),
          type: 'bar',
        }],
      };
    },
  },
};
</script>
```
