import ElementJSX from "./ElementJSX";
import fs from "fs";
import path from "path";
import Element from "./Element";

const Outer = ({ name, children }: { name: string | null; children: JSX.Element[] }) => {
  return (
    <div>
      {name && <span>{name}</span>}
      <main>{children}</main>
    </div>
  );
};

const OtherThing = () => {
  return (
    <Outer name="Oscar">
      <p>Heya</p>
      <p>some stuff in main</p>
    </Outer>
  );
};

const hm = <p>hey</p>;

const result = OtherThing();

console.log(result.render());
