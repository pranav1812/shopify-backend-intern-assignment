module.exports= {
    serverErrorResponse: (res, message) => {
        return res.status(500).json({
            status: 'server error',
            message: message,
        })
    },
    successResponse: (res, message, data) => {
        return res.status(200).json({
            status: 'success',
            message: message,
            data: data,
        })
    },
    badRequestResponse: (res, message) => {
        return res.status(400).json({
            status: 'bad request',
            message: message,
        })
    },
    notFoundResponse: (res, message) => {
        return res.status(404).json({
            status: 'not found',
            message: message,
        })
    }
}