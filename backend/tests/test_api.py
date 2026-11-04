from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check_returns_ok():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "ki-suite-api"}


def test_text_preview_returns_basic_metrics():
    response = client.post(
        "/api/v1/text/preview",
        json={"text": "Hallo Welt\nDas ist ein Test."},
    )

    assert response.status_code == 200
    assert response.json() == {
        "character_count": 28,
        "word_count": 6,
        "line_count": 2,
    }


def test_text_preview_rejects_empty_text():
    response = client.post("/api/v1/text/preview", json={"text": ""})

    assert response.status_code == 422


def test_text_preview_rejects_oversized_input():
    response = client.post("/api/v1/text/preview", json={"text": "x" * 20_001})

    assert response.status_code == 422
