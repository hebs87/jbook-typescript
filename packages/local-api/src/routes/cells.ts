import express from "express";
import fs from "fs/promises";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    // Make sure cell storage file exists

    // If no file, add default list of cells

    // Read file, parse list of cells and send list of cells back to browser
  });

  router.post('/cells', async (req, res) => {
    // Take list of cells from req obj and serialize them
    const {cells}: {cells: Cell[]} = req.body;

    // Write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({status: 'success'});
  });

  return router;
};
