export default {
    endpoint: process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'https://.com',
    table: {
        pageSize: 10
    }
};