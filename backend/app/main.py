from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="KI-Suite API",
    description="Lern- und Integrations-API für die KI-Suite.",
    version="0.1.0",
)

# Allow the existing GitHub Pages frontend and local development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://enesdoudouzi-sys.github.io",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class TextPreviewRequest(BaseModel):
    text: str = Field(min_length=1, max_length=20_000)


@app.get("/health", tags=["Operations"])
def health_check() -> dict[str, str]:
    """Return a lightweight health status for monitoring and deployment checks."""
    return {"status": "ok", "service": "ki-suite-api"}


@app.post("/api/v1/text/preview", tags=["Text"])
def preview_text(payload: TextPreviewRequest) -> dict[str, int]:
    """Return basic text metrics; no text is stored or sent to an AI provider."""
    normalized = payload.text.strip()
    words = normalized.split()
    return {
        "character_count": len(normalized),
        "word_count": len(words),
        "line_count": len(normalized.splitlines()),
    }
