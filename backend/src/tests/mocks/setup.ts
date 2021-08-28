(() => {
    process.env.MONGODB_URI = 'mongodb://localhost/testing'
    process.env.CORS_ORIGIN = 'http://localhost:8080'
})()