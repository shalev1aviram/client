const getAxiosStatus = (error) => {
    if (error.response) {
        return error.response.status
    }
    // **No Response Object Found **
    return false
}

export { getAxiosStatus }