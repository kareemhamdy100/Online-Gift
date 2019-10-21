

// intro point for our server.
// PRO-TIP: if you have an index.js file
// on the root of a folder in node
// you can just require that folder and node will
// automatically require the index.js on the root
const PORT = process.env.PORT || 3000



const app = require('./server/server');
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));


