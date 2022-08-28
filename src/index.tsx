import ElementJSX from "./ElementJSX";
import fs from "fs";
import path from "path";

const list = (
  <ul>
    <li>någonting</li>
    <li>något</li>
  </ul>
);

const page = (
  <html>
    <head></head>
    <body>
      <h1 class="header" data-test="25">
        Ett test som verkar fungera test
      </h1>
      <p>Some other stuff here</p>
      {list}
    </body>
  </html>
);

const pageHtml = page.render();

fs.writeFileSync(path.resolve(__dirname, "../index.html"), pageHtml, "utf-8");
