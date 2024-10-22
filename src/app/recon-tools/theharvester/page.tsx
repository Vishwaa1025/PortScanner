"use client";

import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input'; // ShadCN input component
import { Button } from '@/components/ui/button'; // ShadCN button component
import { ResultsDisplay } from '@/components/ResultsDisplay';

export default function TheHarvester() {
  const [target, setTarget] = useState('');
  const [searchEngine, setSearchEngine] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/theharvester', { target, searchEngine });
      setScanResult(response.data.result);
    } catch (error) {
      setScanResult('Error performing scan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">TheHarvester - OSINT Tool</h1>
      <Input
        type="text"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder="Enter Target Domain"
        className="w-full mb-4"
      />
      <Input
        type="text"
        value={searchEngine}
        onChange={(e) => setSearchEngine(e.target.value)}
        placeholder="Enter Search Engine (google, bing, etc.)"
        className="w-full mb-4"
      />
      <Button onClick={handleScan} disabled={loading}>
        {loading ? 'Scanning...' : 'Start Scan'}
      </Button>
      {scanResult && <ResultsDisplay result={scanResult} />}
    </div>
  );
}
