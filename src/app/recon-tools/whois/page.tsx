'use client';

import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input'; // ShadCN input component
import { Button } from '@/components/ui/button'; // ShadCN button component
import { ResultsDisplay } from '@/components/ResultsDisplay'; // Reusable component to display results

export default function WhoisLookup() {
  const [target, setTarget] = useState<string>(''); // Target domain or IP
  const [scanResult, setScanResult] = useState<string>(''); // Scan result
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/whois', { target });
      setScanResult(response.data.result); // Store the result
    } catch (error) {
      setScanResult('Error performing WHOIS lookup'); // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">WHOIS Lookup</h1>
      <Input
        type="text"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder="Enter Domain or IP Address"
        className="w-full mb-4"
      />
      <Button onClick={handleScan} disabled={loading}>
        {loading ? 'Looking up...' : 'Start Lookup'}
      </Button>
      {scanResult && <ResultsDisplay result={scanResult} />}
    </div>
  );
}
