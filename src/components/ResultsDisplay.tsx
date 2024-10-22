export function ResultsDisplay({ result }: { result: string }) {
    return (
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Scan Results:</h2>
        <pre className="whitespace-pre-wrap">{result}</pre>
      </div>
    );
  }
  