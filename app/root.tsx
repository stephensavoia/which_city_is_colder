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
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Jersey+20&family=Maven+Pro:wght@400..900&display=swap" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
];  


export const meta: MetaFunction = () => {
  return [
    { title: "Which City is Colder?" },
    { name: "description", content: "A weather game." },
    { name: "msapplication-TileColor", content: "#2b5797"},
    { name: "theme-color", content: "#ffffff"},
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
