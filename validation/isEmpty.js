module.exports = (value) => {
        return value === undefined || value === null || (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
    }
    // 判断对象是否为空。