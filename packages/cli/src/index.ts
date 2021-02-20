#!/usr/bin/env
// Above command ensures user can run command directly from the CLI once published to npm

import {program} from 'commander';
import {serveCommand} from './commands/serve';

program
  .addCommand(serveCommand);

program.parse(process.argv);
