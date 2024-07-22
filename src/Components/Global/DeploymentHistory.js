import React, { useState, useEffect } from 'react';

const DeploymentHistory = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Deployment History</h1>
      <pre style={styles.data}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '40px auto',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  data: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontSize: '14px',
    overflow: 'auto',
    maxHeight: '400px', // Ensure large data is scrollable
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    color: 'red',
  },
};

export default DeploymentHistory;
