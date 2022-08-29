# server-jsx

This is a minimal, non-React JSX factory which allows using JSX expressions to generate static html. Being naturally TypeScript-friendly, this could be used as a strongly typed templating engine, or as a static site generator.

## Usage

Add the following fields to your tsconfig.json:
```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "ServerJSX"
  },
}
```
ServerJSX is the name of the function that will be used to resolve JSX expressions. As long as it is imported into the file, JSX expressions can be used.

```typescript
import ServerJSX from "server-jsx";

interface Props {
  name: string;
  city: string;
}

const PersonListItem = ({ name, city }: Props) => (
  <li>
    <span class="person_name">{name}</span>
    <span class="person_city">{city}</span>
  </li>
);

const person = <PersonListItem name="Oscar" city="Stockholm" />;

// All elements returned from JSX expressions have a render method, which returns the HTML as a string

const html = person.render();
// <li>
//    <span class="person_name">Oscar</span>
//    <span class="person_city">Stockholm</span>
// </li>

```