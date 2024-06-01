import { Button, Html, Img } from "@react-email/components";
import * as React from "react";

export default function Email() {
  return (
    <Html>
      <Img src={`/static/logo.png`} alt="Vercel" width={40} height={40} />
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}
