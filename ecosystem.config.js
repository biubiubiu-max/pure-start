module.exports = {
  apps: [{
    name: "start-page",
    script: "pnpm",
    args: "run start -p 13000",
    autorestart: true,  // 启用自动重启
    watch: true,        // 关闭文件监听（生产环境建议关闭）
  }]
};
