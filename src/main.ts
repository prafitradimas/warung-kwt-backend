
import { randomUUID } from "crypto";
import { web } from "./application/web.js";

const port = 3000;
web.listen(port, ()=> {
    console.log(`UUID: ${randomUUID().toString()}`);
    return console.log(`listening to http://localhost:${port}`);
});
