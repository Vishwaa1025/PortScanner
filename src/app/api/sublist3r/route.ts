// /src/app/api/sublist3r/route.ts

import { NextResponse } from 'next/server';
import { exec } from 'child_process';

// POST request handler for Sublist3r scan
export async function POST(request: Request) {
  const { target } = await request.json();

  if (!target) {
    return NextResponse.json({ error: 'Target is required' }, { status: 400 });
  }

  const venvPython = 'src/tools/venv/bin/python3';
  const command = `${venvPython} src/tools/Sublist3r/sublist3r.py -d ${target}`;

  return new Promise((resolve) => {
    exec(command, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Sublist3r error: ${stderr}`);
        resolve(NextResponse.json({ error: `Failed to execute Sublist3r. Details: ${stderr}` }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ result: stdout }));
      }
    });
  });
}
