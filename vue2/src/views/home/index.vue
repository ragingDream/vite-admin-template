<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in cardList" :key="item.title">
        <div class="card-box">
          <div class="card-header">
            <div class="flex justify-between items-center">
              <span>{{ item.title }}</span>
              <el-tag :type="item.type">{{ item.action }}</el-tag>
            </div>
          </div>
          <div class="card-content">
            <div class="py-4 px-4 flex items-center justify-between">
              <count-to
                class="text-3xl"
                prefix="$"
                :start-val="0"
                :end-val="item.value"
                :duration="3000"
              />
              <svg-icon :name="item.icon" class="total-icon" />
            </div>
          </div>
          <div class="card-footer">
            <div class="flex items-center justify-between">
              <span>总{{ item.title }}</span>
              <count-to prefix="$" :start-val="0" :end-val="item.total" :duration="3000" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-card class="my-4">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="流量趋势" name="line" lazy>
          <chart v-if="activeName === 'line'" :chartOptions="lineOptions" />
        </el-tab-pane>
        <el-tab-pane label="访问量" name="bar" lazy>
          <chart v-if="activeName === 'bar'" :chartOptions="barOptions" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-row :gutter="20" class="my-4">
      <el-col :span="8">
        <el-card>
          <template #header>转化率</template>
          <chart :chartOptions="radarOptions" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>访问来源</template>
          <chart :chartOptions="pieOptions" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <template #header>成交占比</template>
          <chart :chartOptions="ntOptions" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to';
  import Chart from '@/components/Chart';

  export default {
    name: 'Home',
    components: { CountTo, Chart },
    data() {
      return {
        cardList: [
          {
            title: '访问量',
            icon: 'visit-count',
            value: 19316,
            total: 644010,
            type: 'success',
            action: '日',
          },
          {
            title: '销售额',
            icon: 'download-count',
            value: 90182,
            total: 158492,
            type: 'warning',
            action: '周',
          },
          {
            title: '订单量',
            icon: 'total-sales',
            value: 97719,
            total: 556182,
            type: 'danger',
            action: '月',
          },
          {
            title: '成交额',
            icon: 'transaction',
            value: 28835,
            total: 226207,
            type: '',
            action: '年',
          },
        ],
        activeName: 'line',
        lineOptions: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [...new Array(18)].map((_item, index) => `${index + 6}:00`),
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                type: 'solid',
                color: 'rgba(226,226,226,0.5)',
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: [
            {
              type: 'value',
              max: 80000,
              splitNumber: 4,
              axisTick: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
                },
              },
            },
          ],
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          series: [
            {
              smooth: true,
              data: [
                111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444,
                22222, 11111, 4000, 2000, 500, 333, 222, 111,
              ],
              type: 'line',
              areaStyle: {},
              itemStyle: {
                color: '#5ab1ef',
              },
            },
            {
              smooth: true,
              data: [
                33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201,
                390, 198, 60, 30, 22, 11,
              ],
              type: 'line',
              areaStyle: {},
              itemStyle: {
                color: '#019680',
              },
            },
          ],
        },
        barOptions: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                width: 1,
                color: '#019680',
              },
            },
          },
          grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
          xAxis: {
            type: 'category',
            data: [...new Array(12)].map((_item, index) => `${index + 1}月`),
          },
          yAxis: {
            type: 'value',
            max: 8000,
            splitNumber: 4,
          },
          series: [
            {
              data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200, 4800],
              type: 'bar',
              barMaxWidth: 80,
            },
          ],
        },
        radarOptions: {
          legend: {
            bottom: 0,
            data: ['访问', '购买'],
          },
          tooltip: {},
          radar: {
            radius: '60%',
            splitNumber: 8,
            indicator: [
              {
                name: '电脑',
              },
              {
                name: '充电器',
              },
              {
                name: '耳机',
              },
              {
                name: '手机',
              },
              {
                name: 'Ipad',
              },
              {
                name: '耳机',
              },
            ],
          },
          series: [
            {
              type: 'radar',
              symbolSize: 0,
              areaStyle: {
                shadowBlur: 0,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1,
              },
              data: [
                {
                  value: [90, 50, 86, 40, 50, 20],
                  name: '访问',
                  itemStyle: {
                    color: '#b6a2de',
                  },
                },
                {
                  value: [70, 75, 70, 76, 20, 85],
                  name: '购买',
                  itemStyle: {
                    color: '#5ab1ef',
                  },
                },
              ],
            },
          ],
        },
        pieOptions: {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '1%',
            left: 'center',
          },
          series: [
            {
              color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '12',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
              ],
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay: function () {
                return Math.random() * 100;
              },
            },
          ],
        },
        ntOptions: {
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
              data: [
                { value: 500, name: '电子产品' },
                { value: 310, name: '服装' },
                { value: 274, name: '化妆品' },
                { value: 400, name: '家居' },
              ].sort(function (a, b) {
                return a.value - b.value;
              }),
              roseType: 'radius',
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay: function () {
                return Math.random() * 400;
              },
            },
          ],
        },
      };
    },
  };
</script>

<style lang="scss" scoped>
  .card-box {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    .card-header,
    .card-content,
    .card-footer {
      padding: 16px 12px;
    }

    .card-header {
      font-size: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .total-icon {
      width: 50px;
      height: 50px;
    }

    .card-footer {
      font-size: 14px;
      border-top: 1px solid #f0f0f0;
    }
  }
</style>
