import { Input } from '@/components/ui/input'; // ShadCN input component
import { Button } from '@/components/ui/button'; // ShadCN button component

export function InputForm({ target, setTarget, placeholder, handleScan, loading }: any) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder={placeholder}
        className="w-full mb-4"
      />
      <Button onClick={handleScan} disabled={loading}>
        {loading ? 'Scanning...' : 'Start Scan'}
      </Button>
    </div>
  );
}
