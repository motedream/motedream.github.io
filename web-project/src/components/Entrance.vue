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
          <div class="upload-section">
            <input 
              type="file" 
              ref="fileInput"
              accept=".xlsx, .xls" 
              @change="handleFileUpload"
              style="display: none;"
            >
            <button 
              class="submit-btn" 
              @click="triggerFileInput"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">
                <span class="btn-text">{{ uploadBtnText }}</span>
                <span class="btn-icon">→</span>
              </span>
              <span v-else>处理中...</span>
            </button>
          </div>
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
  import * as XLSX from 'xlsx';
  import axios from 'axios';
  
  const chartRef = ref<HTMLCanvasElement | null>(null);
  const chartInstance = ref<Chart | null>(null);
  const fileInput = ref<HTMLInputElement | null>(null);
  const isLoading = ref(false);
  const uploadBtnText = ref('上传Excel文件');
  const rocData = ref<{ fpr: number; tpr: number }[]>([]);
  
  // 模拟评估指标数据
  const metrics = ref([
    { name: 'Pre', value: '0.92', color: '#4FD675' },
    { name: 'Se', value: '0.89', color: '#6C5DD3' },
    { name: 'Sp', value: '0.94', color: '#FF754C' },
    { name: 'Fl', value: '0.91', color: '#FFA2C0' },
    { name: 'Ga', value: '0.87', color: '#7FBA7A' },
    { name: 'BAl', value: '0.93', color: '#A0D7E7' },
  ]);
  
  
  // 触发文件选择对话框
  const triggerFileInput = () => {
    fileInput.value?.click();
  };

// 处理文件上传
const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.[0]) return;

  isLoading.value = true;
  uploadBtnText.value = '解析数据中...';

  try {
    // 1. 上传文件
    const formData = new FormData();
    formData.append('excel', input.files[0]);
    const apiBaseUrl = import.meta.env.VITE_API_URL;
    const subEndpoint = import.meta.env.VITE_IMPORT; 
    const response = await axios.post(`${apiBaseUrl}${subEndpoint}`, formData, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response)
    // 2. 解析返回的Excel
    const workbook = XLSX.read(new Uint8Array(response.data), { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    // 3. 提取ROC数据（假设第一列是FPR，第二列是TPR）
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    rocData.value = rawData.slice(1).map(row => ({
      fpr: parseFloat((row as any[])[0]),
      tpr: parseFloat((row as any[])[1])
    }));

    // 4. 更新指标数据（假设第二个Sheet存储指标）
    const metricSheet = workbook.Sheets[workbook.SheetNames[1]];
    const metricData = XLSX.utils.sheet_to_json(metricSheet);
    metrics.value = metricData.map((item: any) => ({
      name: item.Metric,
      value: item.Value,
      color: getColorByMetric(item.Metric)
    }));

    // 5. 渲染图表
    renderChart();

  } catch (error) {
    console.error('文件处理失败:', error);
    alert('文件处理失败，请检查文件格式');
  } finally {
    isLoading.value = false;
    uploadBtnText.value = '重新上传文件';
  }
};

// 颜色映射函数
const getColorByMetric = (metric: string) => {
  const colorMap: { [key: string]: string } = {
    'Pre': '#4FD675',
    'Se': '#6C5DD3',
    'Sp': '#FF754C',
    'Fl': '#FFA2C0',
    'Ga': '#7FBA7A',
    'BAl': '#A0D7E7'
  };
  return colorMap[metric] || '#999';
};

  const renderChart = () => {
    if (!chartRef.value) return;
    
    const ctx = chartRef.value.getContext('2d');
    if (!ctx) return;
  
    if (chartInstance.value) {
      chartInstance.value.destroy();
    }
  

  chartInstance.value = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'ROC Curve',
          data: rocData.value.map(p => ({ x: p.fpr, y: p.tpr })),
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

  /* 新增上传相关样式 */
.upload-section {
  margin: 20px 0;
}

.submit-btn[disabled] {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.7;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: #eee;
  margin-top: 8px;
  border-radius: 2px;
  overflow: hidden;
}

.progress-inner {
  height: 100%;
  background-color: #4FD675;
  transition: width 0.3s ease;
}
  </style>