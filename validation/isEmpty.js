module.exports = (value) => {
        return value === undefined || value === null || Object.keys(value).length === 0
    }
    // 判断对象是否为空。