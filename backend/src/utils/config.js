module.exports= {
    PORT: process.env.PORT || 5000,
    MONGOOSE_URL: process.env.MONGOOSE_URL || 'mongodb://localhost:27017/shopify-assignment',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
}