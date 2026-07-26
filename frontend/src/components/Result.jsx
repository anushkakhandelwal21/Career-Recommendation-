import React, { useState, useEffect } from 'react';
import "../styles/Result.css";
import { useNavigate } from "react-router-dom";

function DisplayListFromBackend() {
  const [jobRoles, setJobRoles] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedDictionary = localStorage.getItem('data');
    if (storedDictionary) {
      const dictionary = JSON.parse(storedDictionary);
      if (dictionary && dictionary.arr && Array.isArray(dictionary.arr) && dictionary.arr.length > 0) {
        dictionary.arr.sort((a, b) => b.score - a.score);
        setJobRoles(dictionary.arr);
      }
    }
  }, []);

  const retake = () => {
    navigate("/test");
  }

  return (
    <div className='job'>
      <h1 className='jobHeading'>Recommended job roles</h1>
      {jobRoles.slice(0, 20).map((jobRole, index) => (
        <div className='jobsdata' key={index}>
          <p className='jobroles'>{jobRole.name}</p>
          <p className='jobroles'>{(jobRole.score * 100).toFixed(2)}%</p>
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: "center", gap: "1rem" }}>
        <button className='test-btn' onClick={retake}>
          Retake Assessment
        </button>
        <a href='/' className='test-btn'>Home</a>
      </div>
    </div>
  );
}

export default DisplayListFromBackend;
