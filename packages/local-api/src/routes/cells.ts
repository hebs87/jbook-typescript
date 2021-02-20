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
  // Create JSON parser middleware
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      // Read the file
      const result = await fs.readFile(fullPath, {encoding: 'utf-8'});

      // Read file, parse list of cells and send list of cells back to browser
      res.send(JSON.parse(result));
    } catch (error) {
      // If read throws an error, inspect and see if it says file doesn't exist
      if (error.code === 'ENOENT') {
        // Create file and add default cells
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([]);
      } else {
        throw error;
      }
    }
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
