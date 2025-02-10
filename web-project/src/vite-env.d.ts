/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string; // 定义一个自定义环境变量
    readonly VITE_APP_TITLE: string; // 定义另一个变量
    // 你可以根据需要添加更多变量
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }