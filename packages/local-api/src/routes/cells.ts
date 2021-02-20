import express from "express";

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.get('/cells', async (req, res) => {
    // Make sure cell storage file exists

    // If no file, add default list of cells

    // Read file, parse list of cells and send list of cells back to browser
  });

  router.post('/cells', async (req, res) => {
    // Make sure cell storage file exists

    // If no file, create it

    // Take list of cells from req obj and serialize them

    // Write the cells into the file
  });

  return router;
};
