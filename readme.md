# node-jsx

This is a minimal, non-React JSX factory which allows using JSX expressions to generate static html. Being naturally TypeScript-friendly, this could be used as a strongly typed templating engine, or as a static site generator.

## Notice

This is a minimal project made for learning purposes. It has not been exhaustively tested for production deployments and contains no particular measures to remedy common safety issues stemming from HTML template engines. Use at own risk.

## Installation

```npm install @qvistdev/node-jsx```

## Usage

Add the following fields to your tsconfig.json:
```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "NodeJSX",
    "jsxFragmentFactory": "NodeJSX.Fragment"
  },
}
```
NodeJSX is the name of the function that will be used to resolve JSX expressions. As long as it is imported into a file, JSX expressions can be used.

```typescript
import NodeJSX from "node-jsx";

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

// All elements returned from JSX expressions have a render method,
// which returns the HTML as a string.

const html = person.render();
// Output:
// <li>
//    <span class="person_name">Oscar</span>
//    <span class="person_city">Stockholm</span>
// </li>

```
Similar to React, there is a helper type for components that accept children.

```typescript
import NodeJSX, { PropsWithChildren } from "node-jsx";

type Props = PropsWithChildren<{ navItems: string[] }>;

const Layout = ({ navItems, children }: Props) => (
  <div>
    <nav>{navItems.map(navlink => <a href={navlink}>{navlink}</a>)}</nav>
    <main>
      {children}
    </main>
  </div>
);

const Page = () => (
  <Layout>
    <p>Some stuff</p>
  </Layout>
);
```

Custom components can be nested into each other, and their props will be typed.

```typescript
import NodeJSX from "node-jsx";

interface CardProps {
  header: string;
  content: string;
}
const Card = ({ header, content }: CardProps) => (
  <div class="card">
    <h2>{header}</h2>
    <p>{content}</p>
  </div>
);

interface DeckProps {
  cards: Array<{ header: string; content: string; }>
}

const Deck = ({ cards }: DeckProps) => (
  <main>
    {cards.map(({ header, content }) => (
      <Card header={header} content={content} />
    ))}
  </main>
);

```

