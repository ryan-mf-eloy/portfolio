import { ImageResponse } from "next/og";

export const alt = "Ryan Eloy — Full Stack JS Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c0c0c",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: "64px",
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            color: "#9a978f",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          ryan eloy
        </div>

        <div
          style={{
            fontSize: "84px",
            color: "#f5f3ee",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.0,
            letterSpacing: "-0.045em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "960px",
          }}
        >
          <span>Building tools for</span>
          <span>
            learning and autonomy
            <span style={{ color: "#00c14e" }}>.</span>
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "64px",
            left: "64px",
            right: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "18px",
            color: "#6c6a64",
            fontFamily: "monospace",
          }}
        >
          <span>Full Stack JS Developer · São Paulo</span>
          <span>Koda</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
