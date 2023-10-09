export default function fetchTransactions() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { customerId: 'C1', amount: 120, month: 'January' },
                { customerId: 'C1', amount: 220, month: 'February' },
                { customerId: 'C2', amount: 150, month: 'January' },
                { customerId: 'C2', amount: 60, month: 'March' },
            ]);
        }, 1000);
    });
}
