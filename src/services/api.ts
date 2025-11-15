// Service per le chiamate API
// Per ora usa dati mock, ma è strutturato per collegarsi facilmente a un backend reale

import { mockJobs, Job } from '@/data/mockJobs';

// Configurazione API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Simula delay di rete per rendere l'esperienza più realistica
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Flag per decidere se usare mock o API reale
const USE_MOCK_DATA = true; // Cambia a false quando il backend è pronto

class JobsAPI {
  // GET /api/jobs - Lista di tutte le candidature
  async getJobs(): Promise<Job[]> {
    if (USE_MOCK_DATA) {
      await simulateNetworkDelay();
      return [...mockJobs];
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  // GET /api/jobs/:id - Dettaglio di una candidatura
  async getJobById(id: string): Promise<Job | null> {
    if (USE_MOCK_DATA) {
      await simulateNetworkDelay();
      const job = mockJobs.find(j => j.id === id);
      return job || null;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch job');
      return await response.json();
    } catch (error) {
      console.error('Error fetching job:', error);
      throw error;
    }
  }

  // POST /api/jobs - Aggiunge una candidatura
  async createJob(jobData: Omit<Job, 'id' | 'lastUpdated'>): Promise<Job> {
    if (USE_MOCK_DATA) {
      await simulateNetworkDelay();
      const newJob: Job = {
        ...jobData,
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      mockJobs.push(newJob);
      return newJob;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      if (!response.ok) throw new Error('Failed to create job');
      return await response.json();
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  // PUT /api/jobs/:id - Modifica una candidatura
  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    if (USE_MOCK_DATA) {
      await simulateNetworkDelay();
      const index = mockJobs.findIndex(j => j.id === id);
      if (index === -1) throw new Error('Job not found');
      
      mockJobs[index] = {
        ...mockJobs[index],
        ...jobData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      return mockJobs[index];
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      if (!response.ok) throw new Error('Failed to update job');
      return await response.json();
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

  // DELETE /api/jobs/:id - Elimina una candidatura
  async deleteJob(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await simulateNetworkDelay();
      const index = mockJobs.findIndex(j => j.id === id);
      if (index === -1) throw new Error('Job not found');
      mockJobs.splice(index, 1);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete job');
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }
}

export const jobsAPI = new JobsAPI();
