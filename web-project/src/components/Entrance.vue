<template>
    <div class="lipid-factor-prediction">
      <div  class="content-container">
        <div class="illustration">
          <div class="header-section">
            <h4>降脂功能因子预测模型</h4>
            <div class="header-picture">
              <img src="../assets/HeaderPictur.png" alt="">
            </div>
              <div class="tooltip-text">
                <b>使用说明</b>
                <p>1. 本产品可预测成分减脂功能，请输入待测成分英文名，格式需标准；</p>
                <p>2. 模型通过Pubchem等平台自动获取SMILES表达式来进行后续运算；</p>
                <p>3. 如有成分SMILES获取失败，可能由多种原因导致，使用者需自行提供。</p>
              </div>
          </div>
          <p class="instruction-text">请提交数据以查看成分解析结果</p>
          <button class="submit-btn" @click="submitData">
            <span class="btn-text">提交数据</span>
            <span class="btn-icon">→</span>
          </button>
        </div>
      </div>
      
      <div  class="result-container">
        <h4>成分解析结果</h4>
        <div class="chart-section">
          <canvas ref="chartRef"></canvas>
        </div>
        
        <div class="evaluation-section">
          <div class="metric-card" v-for="(metric, index) in metrics" :key="index">
            <div class="metric-header">
              <div class="metric-dot" :style="{backgroundColor: metric.color}"></div>
              <span class="metric-title">{{ metric.name+':' }}</span>
              <div class="metric-value">{{ metric.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  const chartRef = ref<HTMLCanvasElement | null>(null);
  const chartInstance = ref<Chart | null>(null);
  
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
    renderChart();
  };
  
  const renderChart = () => {
    if (!chartRef.value) return;
    
    const ctx = chartRef.value.getContext('2d');
    if (!ctx) return;
  
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }
  
 // ROC曲线模拟数据 (FPR, TPR)
 const rocData = [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.2, tpr: 0.6 },
    { fpr: 0.4, tpr: 0.75 },
    { fpr: 0.6, tpr: 0.9 },
    { fpr: 1.0, tpr: 1.0 }
  ];

  chartInstance.value = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'ROC Curve',
          data: rocData.map(p => ({ x: p.fpr, y: p.tpr })),
          borderColor: '#4FD675',
          backgroundColor: 'rgba(79, 214, 117, 0.1)',
          borderWidth: 3,
          fill: false,
          tension: 0.4,
          pointRadius: 5
        },
        {
          label: 'Random Guess',
          data: [{x:0, y:0}, {x:1, y:1}],
          borderColor: '#999',
          borderWidth: 1,
          borderDash: [5, 5],
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          display: true,
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            title: (items) => `Threshold: ${items[0].dataIndex}`,
            label: (ctx) => `FPR: ${ctx.parsed.x.toFixed(2)}, TPR: ${ctx.parsed.y.toFixed(2)}`
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          min: 0,
          max: 1,
          title: {
            display: true,
            text: 'False Positive Rate (FPR)',
            color: '#666'
          }
        },
        y: {
          type: 'linear',
          min: 0,
          max: 1,
          title: {
            display: true,
            text: 'True Positive Rate (TPR)',
            color: '#666'
          }
        }
      }
    }
  });
};
  
  onMounted(() => {
      renderChart();
  });
  </script>
  
  <style scoped>
  .lipid-factor-prediction {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    background: url('../assets/enBackground.png') no-repeat ;
    background-size: contain;
    background-attachment: fixed; /* 背景图固定不动 */
    justify-content: space-evenly;
  }
  
  
  
  .content-container, .result-container {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 20px;
    width: 600px;
    height: 570px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    margin:20px 0 20px;
  }
  
  .header-section {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  
  .tooltip-text {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  .header-picture{
    margin:10px 0;
  }

  .tooltip-text p{
    margin-bottom: 0;
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
    height:374px;
    margin:5px 0;
  }
  
  .evaluation-section {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }
  
  .metric-card {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    width: calc(30%);
    text-align: center;
  }
  
  .metric-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
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