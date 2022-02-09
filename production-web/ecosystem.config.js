module.exports = {
  apps: [
    {
      name: 'HelpDesk',
      script: 'serve',
      // instances: 1,
      autorestart: true,
      watch: ['build'],
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PM2_SERVE_PATH: './build',
        PM2_SERVE_PORT: 9080,
        PM2_SERVE_SPA: 'true',
      },
    },
  ],
}
