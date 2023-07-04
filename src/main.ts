
import { web } from "./application/web.js";

console.log("Hello World!");

const port = 3000;
web.listen(port, ()=> {
    return console.log(`listening to http://localhost:${port}`);
});
