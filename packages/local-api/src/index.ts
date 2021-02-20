// Args - port to run on, filename of the save/fetch file, dir to save the file into
export const serve = (port: number, filename: string, dir: string) => {
  console.log(`Serving traffic on port ${port}`);
  console.log(`Saving/fetching cells from ${filename}`);
  console.log(`That file is in dir ${dir}`);
};
