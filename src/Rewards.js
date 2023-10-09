import React, { useEffect, useState } from 'react';
import fetchTransactions from './fetchTransactions';

function Rewards() {
    const [transactions, setTransactions] = useState([]);
    const [rewardsData, setRewardsData] = useState({});

    useEffect(() => {
        fetchTransactions().then((data) => {
            setTransactions(data);
            calculateAndSetRewardsData(data);
        });
    }, []);

    function calculateRewards(price) {
        let rewards = 0;
        if (price >= 50 && price <= 100) {
            rewards = price - 50;
        } else if (price > 100) {
            rewards = 2 * (price - 100) + 50;
        }
        return rewards;
    }
    

    const calculateAndSetRewardsData = (transactions) => {
        const rewards = transactions.reduce((acc, transaction) => {
            const points = calculateRewards(transaction.amount);
            acc[transaction.customerId] = acc[transaction.customerId] || { total: 0, monthly: {} };
            acc[transaction.customerId].total += points;
            acc[transaction.customerId].monthly[transaction.month] = (acc[transaction.customerId].monthly[transaction.month] || 0) + points;
            return acc;
        }, {});
        setRewardsData(rewards);
    };

    return (
        <div className="container">
            <h1 className="header">Rewards Program</h1>
            {Object.entries(rewardsData).map(([customerId, data]) => (
                <div key={customerId} className="customer-data">
                    <h2 className="sub-header">{customerId}</h2>
                    <p className="info-text">Total Rewards: {data.total}</p>
                    <h3 className="sub-header-2">Monthly Rewards:</h3>
                    <ul className="rewards-list">
                        {Object.entries(data.monthly).map(([month, points]) => (
                            <li key={month} className="list-item">{month}: {points} points</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Rewards;
