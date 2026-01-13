"""Tests for chat transcript CRUD endpoints."""

import uuid

from fastapi.testclient import TestClient

from app.core.config import settings


def test_list_transcripts_requires_auth(client: TestClient) -> None:
    """Test that anonymous users cannot list transcripts."""
    response = client.get(f"{settings.API_V1_STR}/me/chat-transcripts/")
    assert response.status_code == 401


def test_list_transcripts_empty(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test listing transcripts when user has none."""
    response = client.get(
        f"{settings.API_V1_STR}/me/chat-transcripts/",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert "data" in content
    assert "count" in content
    # Could be 0 or more if other tests created transcripts


def test_create_transcript(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test saving a chat transcript."""
    data = {
        "title": "My Test Chat",
        "messages": [
            {"role": "user", "content": "Find me tutorials"},
            {"role": "assistant", "content": "Here are some tutorials..."},
        ],
    }
    response = client.post(
        f"{settings.API_V1_STR}/me/chat-transcripts/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["title"] == "My Test Chat"
    assert len(content["messages"]) == 2
    assert content["messages"][0]["role"] == "user"
    assert "id" in content
    assert "created_at" in content


def test_get_transcript(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test getting a specific transcript."""
    # First create one
    data = {
        "title": "Another Chat",
        "messages": [{"role": "user", "content": "Hello"}],
    }
    create_response = client.post(
        f"{settings.API_V1_STR}/me/chat-transcripts/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert create_response.status_code == 200
    transcript_id = create_response.json()["id"]

    # Now get it
    response = client.get(
        f"{settings.API_V1_STR}/me/chat-transcripts/{transcript_id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["id"] == transcript_id
    assert content["title"] == "Another Chat"


def test_get_transcript_not_found(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test getting a non-existent transcript."""
    fake_id = uuid.uuid4()
    response = client.get(
        f"{settings.API_V1_STR}/me/chat-transcripts/{fake_id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 404


def test_get_transcript_ownership(
    client: TestClient,
    normal_user_token_headers: dict[str, str],
    superuser_token_headers: dict[str, str],
) -> None:
    """Test that users cannot access other users' transcripts."""
    # Create transcript as normal user
    data = {
        "title": "Private Chat",
        "messages": [{"role": "user", "content": "Secret stuff"}],
    }
    create_response = client.post(
        f"{settings.API_V1_STR}/me/chat-transcripts/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert create_response.status_code == 200
    transcript_id = create_response.json()["id"]

    # Try to access as superuser (different user) - should not find it
    response = client.get(
        f"{settings.API_V1_STR}/me/chat-transcripts/{transcript_id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_delete_transcript(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test deleting a transcript."""
    # Create one
    data = {
        "title": "To Be Deleted",
        "messages": [{"role": "user", "content": "Bye"}],
    }
    create_response = client.post(
        f"{settings.API_V1_STR}/me/chat-transcripts/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert create_response.status_code == 200
    transcript_id = create_response.json()["id"]

    # Delete it
    response = client.delete(
        f"{settings.API_V1_STR}/me/chat-transcripts/{transcript_id}",
        headers=normal_user_token_headers,
    )
    assert response.status_code == 200
    assert "deleted" in response.json()["message"].lower()

    # Verify it's gone
    get_response = client.get(
        f"{settings.API_V1_STR}/me/chat-transcripts/{transcript_id}",
        headers=normal_user_token_headers,
    )
    assert get_response.status_code == 404


def test_delete_transcript_ownership(
    client: TestClient,
    normal_user_token_headers: dict[str, str],
    superuser_token_headers: dict[str, str],
) -> None:
    """Test that users cannot delete other users' transcripts."""
    # Create transcript as normal user
    data = {
        "title": "Not Your Chat",
        "messages": [{"role": "user", "content": "Private"}],
    }
    create_response = client.post(
        f"{settings.API_V1_STR}/me/chat-transcripts/",
        headers=normal_user_token_headers,
        json=data,
    )
    assert create_response.status_code == 200
    transcript_id = create_response.json()["id"]

    # Try to delete as superuser (different user) - should not find it
    response = client.delete(
        f"{settings.API_V1_STR}/me/chat-transcripts/{transcript_id}",
        headers=superuser_token_headers,
    )
    assert response.status_code == 404


def test_list_transcripts_pagination(
    client: TestClient, normal_user_token_headers: dict[str, str]
) -> None:
    """Test pagination of transcripts."""
    # Create a few transcripts
    for i in range(3):
        data = {
            "title": f"Chat {i}",
            "messages": [{"role": "user", "content": f"Message {i}"}],
        }
        client.post(
            f"{settings.API_V1_STR}/me/chat-transcripts/",
            headers=normal_user_token_headers,
            json=data,
        )

    # List with pagination
    response = client.get(
        f"{settings.API_V1_STR}/me/chat-transcripts/",
        headers=normal_user_token_headers,
        params={"skip": 0, "limit": 2},
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content["data"]) <= 2
    assert content["count"] >= 3  # We created at least 3
