const formatType = (type) => {
    if (type && typeof type === 'string') {
        let caoTypeName = type.charAt(0).toUpperCase() + type.slice(1);
        return caoTypeName;
    } else {
        return '';
    }
};
const formatPrice = (price) => {
    let formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format((price / 100).toFixed(2));
    return formattedPrice;
};
const getStorageItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        console.error('Error getting data from localStorage', error);
        return [];
    }
};
const setStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// const setStorageItemSecond = (key, value) => {
//     localStorage.setItem(key, JSON.stringify(value));
// };

export {
    formatType,
    formatPrice,
    getStorageItem,
    setStorageItem,

}