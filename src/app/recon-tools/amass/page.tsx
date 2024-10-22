'use client';

import { useState } from 'react';
import axios from 'axios';
import { InputForm } from '@/components/InputForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';

export default function Amass() {
  const [target, setTarget] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/amass', { target });
      setScanResult(response.data.result);
    } catch (error) {
      setScanResult('Error performing scan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Amass - OSINT Tool</h1>
      <InputForm
        target={target}
        setTarget={setTarget}
        placeholder="Enter Target Domain"
        handleScan={handleScan}
        loading={loading}
      />
      {scanResult && <ResultsDisplay result={scanResult} />}
    </div>
  );
}
