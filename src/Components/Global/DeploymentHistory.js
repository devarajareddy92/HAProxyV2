import React, { useState, useEffect } from 'react';
import IpAddress from '../../IPConfig';

const DeploymentHistory = () => {
  const IP = IpAddress();
  const [jsonData, setJsonData] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const localStorageKey = localStorage.getItem('proToken');

  useEffect(() => {
    setLoadingFlag(true);
    fetch(IP + "list_config", {
      headers: {
        "Authorization": localStorageKey
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.error === 0) {
          setJsonData(data.files);
        } else if (data.error === 1) {
          // navigate('/');
        }
        setLoadingFlag(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoadingFlag(false);
      });
  }, [IP, localStorageKey]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return jsonData.slice(startIndex, startIndex + itemsPerPage);
  };

  if (loadingFlag) {
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
      <div style={styles.data}>
        {getPaginatedData().map((file, index) => (
          <pre key={index}>{JSON.stringify(file, null, 2)}</pre>
        ))}
      </div>
      <Pagination
        totalItems={jsonData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisibleButtons = 10;
  const [currentRangeStart, setCurrentRangeStart] = useState(1);

  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const handleNextRange = () => {
    setCurrentRangeStart(currentRangeStart + maxVisibleButtons);
  };

  const handlePrevRange = () => {
    setCurrentRangeStart(currentRangeStart - maxVisibleButtons);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = currentRangeStart; i < currentRangeStart + maxVisibleButtons && i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          style={{
            ...styles.pageButton,
            ...(currentPage === i ? styles.activePageButton : {})
          }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div style={styles.pagination}>
      {currentRangeStart > 1 && (
        <button style={styles.pageButton} onClick={handlePrevRange}>
          Previous
        </button>
      )}
      {renderPageNumbers()}
      {currentRangeStart + maxVisibleButtons <= totalPages && (
        <button style={styles.pageButton} onClick={handleNextRange}>
          Next
        </button>
      )}
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
    maxHeight: '400px',
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
  pagination: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
    gap: '5px'
  },
  pageButton: {
    padding: '10px 15px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
  activePageButton: {
    backgroundColor: '#333',
    color: '#fff',
  },
};

export default DeploymentHistory;
