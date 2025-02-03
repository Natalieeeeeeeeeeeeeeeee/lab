self.onmessage = function(event) {
    const processedData = processData(event.data);
    self.postMessage(processedData);
};

function processData(data) {
    return data.map(item => ({ id: item.id, name: item.name.toUpperCase(), email: item.email }));
}