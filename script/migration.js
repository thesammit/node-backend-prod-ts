// Description: This script is used to migrate the database schema.
const { exec } = require('child_process');

// Get command and migration name from command line arguments
// command: create, up, down, list, prune
// migrationName: migration name
const command = process.argv[2];
const migrationName = process.argv[3];

const validateCommands = ['create', 'up', 'down', 'list', 'prune'];
if (!validateCommands.includes(command)) {
    console.error(`Invalid command: Command must be one of ${validateCommands.join(', ')}`);
    process.exit(0);
}

const commandsWithoutMigrateName = ['list', 'prune'];
if (!commandsWithoutMigrateName.includes(command)) {
    if (!migrationName) {
        console.error('Migration name is required');
        process.exit(0);
    }
}

function runNodeScript() {
    return new Promise((resolve, reject) => {
        let execCommand = ``;

        if (commandsWithoutMigrateName.includes(command)) {
            execCommand = `migrate ${command}`;
        } else {
            execCommand = `migrate ${command} ${migrationName}`;
        }

        const childProcess = exec(execCommand, (error, stdout, stderr) => {
            if (error) {
                reject(`Error running script: ${error}`);
            }

            if (stderr) {
                reject(`Error running script: ${stderr}`);
            }

            resolve(stdout);
        });

        childProcess.stderr.on('data', (data) => {
            console.error(data);
        });
    });
}

runNodeScript()
    .then((result) => {
        console.info(result);
    })
    .catch((error) => {
        console.error(`Error: ${error}`);
    });
