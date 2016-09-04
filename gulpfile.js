var requireDir = require('require-dir');

// Require all tasks in gulp-tasks/tasks, including subfolders
requireDir('./gulp-tasks', { recurse: true });

