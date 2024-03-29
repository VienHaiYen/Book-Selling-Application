const paginationResponse = (total, page, records, pageSize = 10) => {
    if (!Array.isArray(records)) {
        throw new Error("Records must be an array");
    }

    // const pageSize = records.length; wrong formula, pageSize must be fixed.
    return {
        data: records,
        meta: {
            total: total,
            totalPages: Math.max(Math.ceil(total / pageSize), 1),
            pageSize: records.length,
            page: page,
        },
    };
};

const getOffset = (page, pageSize) => {
    return pageSize * (page - 1);
};

module.exports = {
    paginationResponse,
    getOffset,
};
