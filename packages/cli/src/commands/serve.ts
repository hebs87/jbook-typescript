import path from "path";
import {Command} from "commander";
import {serve} from "local-api";

// square brackets indicate optional values; angle brackets indicate required values
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p --port <number>', 'port to run server on', '4005')
  .action((filename = 'notebook.js', {port}: {port: string}) => {
    const dir = path.join(process.cwd(), path.dirname(filename));

    serve(parseInt(port), path.basename(filename), dir);
  });
