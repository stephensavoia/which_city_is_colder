import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import baseStyles from "~/styles/base.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: baseStyles },
  { href: "https://fonts.googleapis.com/css2?family=Jersey+20&family=Maven+Pro:wght@400..900&display=swap", rel: "stylesheet" },
];  

export const meta: MetaFunction = () => {
  return [
    { title: "Which City is Colder?" },
    { name: "description", content: "A weather game." },
  ];
};
  

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
