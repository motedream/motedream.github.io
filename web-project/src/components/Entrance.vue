<template>
    <div class="lipid-factor-prediction">
      <div v-show="!isResultVisible" class="content-container">
        <div class="illustration">
          <div class="header-section">
            <h2>降脂功能因子预测模型</h2>
            <div class="tooltip" @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
              <span class="tooltip-icon">?</span>
              <div v-show="showTooltip" class="tooltip-text">
                <h3>使用说明</h3>
                <p>1. 准备待分析成分的CSV格式数据文件</p>
                <p>2. 确保数据包含完整的成分浓度信息</p>
                <p>3. 点击提交按钮上传数据文件</p>
                <p>4. 等待系统分析生成预测结果</p>
                <p>5. 结果包含成分解析和效果评估指标</p>
              </div>
            </div>
          </div>
          <p class="instruction-text">请提交数据以查看成分解析结果</p>
          <button class="submit-btn" @click="submitData">
            <span class="btn-text">提交数据</span>
            <span class="btn-icon">→</span>
          </button>
        </div>
      </div>
      
      <div v-show="isResultVisible" class="result-container">
        <div class="chart-section">
          <canvas ref="chartRef"></canvas>
        </div>
        
        <div class="evaluation-section">
          <div class="metric-card" v-for="(metric, index) in metrics" :key="index">
            <div class="metric-header">
              <div class="metric-dot" :style="{backgroundColor: metric.color}"></div>
              <span class="metric-title">{{ metric.name }}</span>
            </div>
            <div class="metric-value">{{ metric.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  const isResultVisible = ref(false);
  const chartRef = ref<HTMLCanvasElement | null>(null);
  const chartInstance = ref<Chart | null>(null);
  const showTooltip = ref(false);
  
  // 模拟评估指标数据
  const metrics = ref([
    { name: 'Pre', value: '0.92', color: '#4FD675' },
    { name: 'Se', value: '0.89', color: '#6C5DD3' },
    { name: 'Sp', value: '0.94', color: '#FF754C' },
    { name: 'Fl', value: '0.91', color: '#FFA2C0' },
    { name: 'Ga', value: '0.87', color: '#7FBA7A' },
    { name: 'BAl', value: '0.93', color: '#A0D7E7' },
  ]);
  
  const submitData = () => {
    isResultVisible.value = true;
    renderChart();
  };
  
  const renderChart = () => {
    if (!chartRef.value) return;
    
    const ctx = chartRef.value.getContext('2d');
    if (!ctx) return;
  
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }
  
    // 模拟数据
    const labels = ['Omega-3', '植物甾醇', '膳食纤维', '多酚类', '中链甘油三酯'];
    const data = [18, 22, 15, 12, 9];
  
    chartInstance.value = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '成分浓度 (mg/100g)',
          data: data,
          borderColor: '#4FD675',
          backgroundColor: 'rgba(79, 214, 117, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0, // 确保折线图是直的
          pointStyle: 'circle',
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(79, 214, 117, 0.9)',
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
              label: (ctx) => `${ctx.parsed.y} mg/100g`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            title: { 
              display: true, 
              text: '营养成分',
              color: '#666',
              font: { size: 14 }
            }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.05)' },
            title: { 
              display: true,
              text: '浓度 (mg/100g)',
              color: '#666',
              font: { size: 14 }
            }
          }
        }
      }
    });
  };
  
  onMounted(() => {
    if (isResultVisible.value) {
      renderChart();
    }
  });
  </script>
  
  <style scoped>
  .lipid-factor-prediction {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
    position: relative;
  }
  
  
  
  .content-container, .result-container {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .tooltip {
    position: relative;
    cursor: pointer;
  }
  
  .tooltip-icon {
    font-size: 18px;
    color: #4FD675;
  }
  
  .tooltip-text {
    position: absolute;
    top: 30px;
    right: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 100;
  }
  
  .instruction-text {
    margin: 20px 0;
    font-size: 16px;
    color: #333;
  }
  
  .submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #4FD675;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #3faa5e;
  }
  
  .btn-text {
    margin-right: 5px;
  }
  
  .btn-icon {
    font-size: 18px;
  }
  
  .chart-section {
    margin: 20px 0;
  }
  
  .evaluation-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .metric-card {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    width: calc(20% - 20px);
    text-align: center;
  }
  
  .metric-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-bottom: 10px;
  }
  
  .metric-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  
  .metric-title {
    font-size: 14px;
    color: #333;
  }
  
  .metric-value {
    font-size: 18px;
    font-weight: bold;
    color: #4FD675;
  }
  </style>