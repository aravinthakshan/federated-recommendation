import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchRecommendations();
    fetchMetrics();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recommendations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const fetchMetrics = async () => {
    // This would fetch your model metrics
    const dummyMetrics = [
      { name: 'Round 1', accuracy: 0.75, loss: 0.25 },
      { name: 'Round 2', accuracy: 0.82, loss: 0.18 },
      { name: 'Round 3', accuracy: 0.88, loss: 0.12 },
    ];
    setMetrics(dummyMetrics);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Recommender Dashboard</h1>
      
      {/* Metrics Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Model Metrics</h2>
        <LineChart width={600} height={300} data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
          <Line type="monotone" dataKey="loss" stroke="#82ca9d" />
        </LineChart>
      </div>
      
      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((item) => (
            <div key={item.item_id} className="border p-4 rounded">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">Score: {item.score}</p>
              <button
                onClick={() => handleFeedback(item.item_id, 1)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Like
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}