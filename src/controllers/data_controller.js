/**
 * Controller that fetches data from the backend
 */

const axios = require("axios")
const domain = "http://localhost:9000"

/**
 * Gets the latest index data from the server
 * @returns Promise<object>
 */
const get_latest_data = () => {
    return axios.get(domain + "/latest_data").then((response) => {
        return response.data
    });
}

module.exports = {
    get_latest_data
}