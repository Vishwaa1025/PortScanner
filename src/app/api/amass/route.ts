// /src/app/api/amass/route.ts

import { NextResponse } from 'next/server';
import { exec } from 'child_process';

// POST request handler for Amass scan
export async function POST(request: Request) {
  const { target } = await request.json();

  if (!target) {
    return NextResponse.json({ error: 'Target is required' }, { status: 400 });
  }

  const command = `amass enum -d ${target}`;

  return new Promise((resolve) => {
    exec(command, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Amass error: ${stderr}`);
        resolve(NextResponse.json({ error: `Failed to execute Amass scan. Details: ${stderr}` }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ result: stdout }));
      }
    });
  });
}
