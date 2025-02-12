<script setup lang="ts">
import '../../public/web/plugins/bulma/bulma.min.css'
import '../../public/web/plugins/themify-icons/themify-icons.css'
import '../../public/web/css/style.css'
</script>

<template>
    <section class="section-sm">
  <div class="container">
    <div class="columns is-justify-content-center">
      <div class="column is-12 mb-5 mb-lg-0">
  <h2 class="h5 section-title">相关搜索</h2>
  <div class="columns is-multiline is-desktop">
    <div class="column is-4-desktop">
      <article class="card mb-4">
        <div class="card-body">
          <h3 class="h4 mb-3"><a class="post-title" href="https://www.deepseek.com/">DeepSeek</a></h3>
          <ul class="card-meta list-inline">
            <li class="list-inline-item">
              <a href="https://www.deepseek.com/" class="card-meta-author">
                <img src="../assets/deepseek.png" alt="DeepSeek">
                <span>DeepSeek</span>
              </a>
            </li>
            <li class="list-inline-item">
              <ul class="card-meta-tag list-inline">
                <li class="list-inline-item"><a href="https://www.deepseek.com/">中国AI</a></li>
                <li class="list-inline-item"><a href="https://www.deepseek.com/">深度思考</a></li>
              </ul>
            </li>
          </ul>
          <p>DeepSeek是深度求索（DeepSeek Inc）的智能技术平台，整合AI大模型、行业方案及开发者生态资源，为企业及开发者提供从模型训练到应用落地的全链路服务，降低技术门槛，加速产业智能化升级。</p>
          <a href="https://www.deepseek.com/" class="btn btn-outline-primary">搜索</a>
        </div>
      </article>
    </div>

    <div class="column is-4-desktop">
      <article class="card mb-4">
        <div class="card-body">
          <h3 class="h4 mb-3"><a class="post-title" href="https://pubchem.ncbi.nlm.nih.gov/">PubChem</a></h3>
          <ul class="card-meta list-inline">
            <li class="list-inline-item">
              <a href="https://pubchem.ncbi.nlm.nih.gov/" class="card-meta-author">
                <img src="../assets/pubchem.png" alt="PubChem">
                <span>PubChem</span>
              </a>
            </li>
            <li class="list-inline-item">
              <ul class="card-meta-tag list-inline">
                <li class="list-inline-item"><a href="https://pubchem.ncbi.nlm.nih.gov/">物质名称</a></li>
                <li class="list-inline-item"><a href="https://pubchem.ncbi.nlm.nih.gov/">分子式</a></li>
                <li class="list-inline-item"><a href="https://pubchem.ncbi.nlm.nih.gov/">结构式</a></li>
              </ul>
            </li>
          </ul>
          <p>PubChem 是世界上最大的可免费获取的化学信息集合。按名称、分子式、结构和其他标识符搜索化学品。查找化学和物理特性、生物活性、安全性和毒性信息、专利、文献引用等。</p>
          <a href="https://pubchem.ncbi.nlm.nih.gov/" class="btn btn-outline-primary">搜索</a>
        </div>
      </article>
    </div>
    
    <div class="column is-4-desktop">
      <article class="card mb-4">
        <div class="card-body">
          <h3 class="h4 mb-3"><a class="post-title" href="https://www.ebi.ac.uk/chembl/">ChEMBL</a></h3>
          <ul class="card-meta list-inline">
            <li class="list-inline-item">
              <a href="https://www.ebi.ac.uk/chembl/" class="card-meta-author">
                <img src="../assets/logo.jpg" alt="chembl">
                <span>chembl</span>
              </a>
            </li>
            <li class="list-inline-item">
              <ul class="card-meta-tag list-inline">
                <li class="list-inline-item"><a href="https://www.ebi.ac.uk/chembl/">化学、生物活性</a></li>
                <li class="list-inline-item"><a href="https://www.ebi.ac.uk/chembl/">基因组数据</a></li>
              </ul>
            </li>
          </ul>
          <p>ChEMBL 是一个手动整理的具有药物样特性的生物活性分子数据库。 它汇集了化学、生物活性和基因组数据，以帮助基因组的转化 信息转化为有效的新药</p>
          <a href="https://www.ebi.ac.uk/chembl/" class="btn btn-outline-primary">搜索</a>
        </div>
      </article>
    </div>
  </div>
</div>
    </div>
  </div>
</section>
</template>

<style scoped>
.section-sm{
    padding:50px 0;
}
.card{
    padding: 0;
}
</style>
