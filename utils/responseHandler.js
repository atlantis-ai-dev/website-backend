/**
 * Standard API Response Format
 * @param {boolean} success - Indicates if the operation was successful
 * @param {string} message - Message describing the result
 * @param {object|array} [data] - The data payload (optional)
 * @param {object} [pagination] - Pagination information (optional)
 * @returns {object} Formatted response object
 */
const createResponse = (success, message, data = null, pagination = null) => {
    const response = {
        success,
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    if (pagination !== null) {
        response.pagination = pagination;
    }

    return response;
};

module.exports = {
    createResponse
}; 