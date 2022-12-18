window.migrationProcess = window.migrationProcess || [];

window.migrationProcess.push({
    version: '3.2.0',
    process: project => new Promise(resolve => {
        // Mark all older projects as TypeScript projects
        project.language = project.language || 'typescript';
        for (const room of project.rooms) {
            // Add `follow` key for all the rooms (camera follow in room properties)
            room.follow = room.follow || -1;
            // Add an array for UI elements
            room.uiElements = room.uiElements || [];
        }
        resolve();
    })
});
