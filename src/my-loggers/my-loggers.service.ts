import { Injectable, ConsoleLogger } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private logDir = path.join(__dirname, '..', '..', 'logs');

  async saveErrorLog(message: string) {
    const logFilePath = path.join(this.logDir, 'error.log');
    const formattedEntry = `${Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date())}\t${message}\n`;

    try {
      // Check if the directory exists, if not, create it
      try {
        await fsPromises.access(this.logDir);
      } catch (err) {
        await fsPromises.mkdir(this.logDir, { recursive: true });
      }

      // Append the log message to the file
      await fsPromises.appendFile(logFilePath, formattedEntry, {
        encoding: 'utf8',
      });
    } catch (error) {
      console.error('Failed to save error log:', error);
    }
  }

  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    this.saveErrorLog(entry);
    super.log(message, context);
  }

  error(message: any, sttackOrContext?: string) {
    const entry = `${sttackOrContext}\t${message}`;
    this.saveErrorLog(entry);
    super.error(message, sttackOrContext);
  }
}
