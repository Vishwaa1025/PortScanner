"use client"; 

import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input'; // ShadCN input component
import { Button } from '@/components/ui/button'; // ShadCN button component
import { ResultsDisplay } from '@/components/ResultsDisplay';

export default function NmapScanner() {
  const [target, setTarget] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/nmap', { target });
      setScanResult(response.data.result);
    } catch (error) {
      setScanResult('Error performing scan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Nmap Port Scanner</h1>
      <Input
        type="text"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder="Enter Target IP or Domain"
        className="w-full mb-4"
      />
      <Button onClick={handleScan} disabled={loading}>
        {loading ? 'Scanning...' : 'Start Scan'}
      </Button>
      {scanResult && <ResultsDisplay result={scanResult} />}
    </div>
  );
}
