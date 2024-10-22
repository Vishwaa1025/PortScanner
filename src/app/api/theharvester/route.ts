// /src/app/api/theharvester/route.ts

import { NextResponse } from 'next/server';
import { exec } from 'child_process';

// POST request handler for TheHarvester scan
export async function POST(request: Request) {
  const { target, searchEngine } = await request.json();

  if (!target || !searchEngine) {
    return NextResponse.json({ error: 'Target and search engine are required' }, { status: 400 });
  }

  const venvPython = 'src/tools/venv/bin/python3';
  const command = `${venvPython} src/tools/theHarvester/theHarvester/theHarvester.py -d ${target} -b ${searchEngine}`;

  return new Promise((resolve) => {
    exec(command, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`TheHarvester error: ${stderr}`);
        resolve(NextResponse.json({ error: `Failed to execute TheHarvester. Details: ${stderr}` }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ result: stdout }));
      }
    });
  });
}
