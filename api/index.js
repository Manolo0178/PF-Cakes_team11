const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
<<<<<<< HEAD

=======
>>>>>>> ebab74f34d182125449ffe6cec53a886a24ca03c
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
