export const groupBy = function<T>(data: T[], key: string) {
    return data?.reduce(function(storage, item) {
        let group = item[key];
        
        storage[group] = storage[group] || [];
        
        storage[group].push(item);
        
        return storage; 
    }, {});
};