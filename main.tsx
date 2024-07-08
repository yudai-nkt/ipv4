import { Hono } from "@hono/hono";
import { getConnInfo } from "@hono/hono/deno";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

const app = new Hono();

app.get(
    "/",
    jsxRenderer(({ children }) => {
        return (
            <html lang="en-US">
                <head>
                    <title>What's Your IP address?</title>
                    <meta charset="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <link
                        rel="stylesheet"
                        href="https://matcha.mizu.sh/matcha.css"
                    />
                </head>
                <body>
                    {children}
                </body>
            </html>
        );
    }),
    (c) => {
        const connInfo = getConnInfo(c);
        return c.render(
            <>
                <h1>What's your IP address?</h1>
                <p>
                    Your IP address is <code>{connInfo.remote.address}</code>.
                </p>
            </>,
        );
    },
);

Deno.serve(app.fetch);
