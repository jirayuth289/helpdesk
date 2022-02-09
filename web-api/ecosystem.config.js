module.exports = {
    apps: [{
        name: 'HelpDesk-API',
        script: 'dist/server.js',
        instances: 1,
        autorestart: true,
        watch: ['dist'],
        max_memory_restart: '1G',
        env_production: {
            NODE_ENV: "production",
            HOST: "http://localhost",
            PORT: "9000",
            CLIENT_HOST: "http://159.65.4.161:9080",

            DB_HOST: "helpdesk-postgres",
            DB_PORT: "5432",
            DB_NAME: "helpdesk",
            DB_USERNAME: "sa",
            DB_PASSWORD: "1234",
        },
    }]
};



