import express from 'express';

// Args - port to run on, filename of the save/fetch file, dir to save the file into
export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  // Resolve promise if successful, or reject and put into error state on error
  return new Promise<void>((resolve, reject) =>{
    app.listen(port, resolve).on('error', reject);
  });
};
