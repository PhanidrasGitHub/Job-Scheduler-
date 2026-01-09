import React from 'react';  


const API_BASE_URL = 'http://localhost:5000/api';

const jobService = {
  async getAllJobs(status = 'all', priority = 'all') {
    const params = new URLSearchParams();
    if (status !== 'all') params.append('status', status);
    if (priority !== 'all') params.append('priority', priority);
    
    const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
  },

  async createJob(jobData) {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) throw new Error('Failed to create job');
    return response.json();
  },

  async runJob(id) {
    const response = await fetch(`${API_BASE_URL}/jobs/run/${id}`, {
      method: 'POST',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to start job execution');
    }
    return response.json();
  }
};

export default jobService;