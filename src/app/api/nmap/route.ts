import { NextResponse } from 'next/server';
import { exec } from 'child_process';

// POST request handler for Nmap scan
export async function POST(request: Request) {
  const { target } = await request.json();

  if (!target) {
    return NextResponse.json({ error: 'Target is required' }, { status: 400 });
  }

  // Execute Nmap command
  return new Promise((resolve) => {
    exec(`nmap -sV ${target}`, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Nmap error: ${stderr}`);
        resolve(NextResponse.json({ error: `Failed to execute Nmap scan. Details: ${stderr}` }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ result: stdout }));
      }
    });
  });
}
