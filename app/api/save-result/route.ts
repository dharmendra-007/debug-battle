import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    if (request.url.includes('/favicon.ico')) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await request.json();
    const baseFolder = 'participants_data';
    const participantFolder = path.join(baseFolder, data.regNo);
    const resultsFile = path.join(baseFolder, 'results.csv');

    // Create base folder if it doesn't exist
    if (!fs.existsSync(baseFolder)) {
      fs.mkdirSync(baseFolder, { recursive: true });
    }

    // Create participant folder if it doesn't exist
    if (!fs.existsSync(participantFolder)) {
      fs.mkdirSync(participantFolder, { recursive: true });
    }

    // Create or append to results.csv
    const csvLine = `${data.name},${data.regNo},${data.startTime},${data.score},${data.time},${data.hints}\n`;
    if (!fs.existsSync(resultsFile)) {
      fs.writeFileSync(resultsFile, '\nName,Registration Number,Start Time,Final Score,Time Taken,Hints Used');
    }
    fs.appendFileSync(resultsFile, csvLine);

    // Save solution files
    if (data.solutions) {
      // Create files for all questions (1 to 5), empty for skipped ones
      for (let i = 0; i < 5; i++) {
        const solutionPath = path.join(participantFolder, `q${i + 1}.c`);
        const solution = data.solutions[i] || ''; // Empty string for skipped questions
        fs.writeFileSync(solutionPath, solution);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving results:', error);
    return NextResponse.json({ success: false, error: 'Failed to save results' }, { status: 500 });
  }
}