self.onmessage = function(event) {
    const n = event.data;
    const result = fibonacci(n);
    self.postMessage(result);
    self.postMessage({ type: "notification", value: result });
};

function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}