import Element from "./Element";
import fs from "fs";
import path from "path";

function e(tag: string) {
  return new Element(tag);
}

function renderPage() {
  return e("html")
    .with(
      e("head"),
      e("body").with(
        e("h1")
          .set({ class: "header", ["data-test"]: "125" })
          .with("Welcome to this page"),
        e("p").with("It is under construction")
      )
    )
    .render();
}

const pageHtml = renderPage();

fs.writeFileSync(path.resolve(__dirname, "../index.html"), pageHtml, "utf-8");
