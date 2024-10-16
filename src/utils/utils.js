// Helper functions for handling responses
function handleError(res, statusCode, message, error = null) {
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error,
    });
}

function handleSuccess(res, message, data, statusCode) {
    return res.status(200).json({
        success: true,
        statusCode,
        message,
        data
    });
}

function handleResourceNotFound(res, message,statusCode) {
    return res.status(500).json({
        success: false,
        message,
        statusCode: 500,
    });
}

module.exports = {
    handleError,
    handleSuccess,
    handleResourceNotFound
};