// /src/app/api/nikto/route.ts

import { NextResponse } from 'next/server';
import { exec } from 'child_process';

// POST request handler for Nikto scan
export async function POST(request: Request) {
  const { target } = await request.json();

  if (!target) {
    return NextResponse.json({ error: 'Target is required' }, { status: 400 });
  }

  const command = `nikto -h ${target}`;

  return new Promise((resolve) => {
    exec(command, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Nikto error: ${stderr}`);
        resolve(NextResponse.json({ error: `Failed to execute Nikto scan. Details: ${stderr}` }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ result: stdout }));
      }
    });
  });
}
