const paginationResponse = (total, page, records) => {
    if (!Array.isArray(records)) {
        throw new Error('Records must be an array');
    }

    const pageSize = records.length

    return {
        data: records,
        meta: {
            total: total,
            totalPages: Math.ceil(total / pageSize),
            pageSize: pageSize,
            page: page
        }
    }
}

module.exports = {
    paginationResponse
}