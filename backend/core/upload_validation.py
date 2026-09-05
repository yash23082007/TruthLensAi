import io
import mimetypes
from fastapi import HTTPException, UploadFile

EXTENSION_FALLBACK = {
    # Images
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".bmp": "image/bmp",
    # Videos
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
    ".avi": "video/avi",
    ".webm": "video/webm",
    ".mkv": "video/mkv",
    # Audio
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
    ".flac": "audio/flac",
    ".aac": "audio/aac",
    ".m4a": "audio/mp4",
}


def validate_upload(file: UploadFile, allowed_types: list[str], max_size_mb: int) -> None:
    raw_content_type = (file.content_type or "").split(";")[0].strip().lower()
    
    # Check if raw content type matches directly
    if raw_content_type and raw_content_type in allowed_types:
        return

    # Check extension fallback if content type is generic or missing
    filename = (file.filename or "").lower()
    for ext, mime in EXTENSION_FALLBACK.items():
        if filename.endswith(ext):
            if mime in allowed_types or raw_content_type in allowed_types:
                return
            # Allow common aliases (e.g. image/jpg vs image/jpeg, audio/x-wav vs audio/wav)
            if any(allowed.split("/")[0] == mime.split("/")[0] for allowed in allowed_types):
                return

    # If mime type is application/octet-stream, guess from filename
    if raw_content_type in ["application/octet-stream", ""]:
        guessed_type, _ = mimetypes.guess_type(filename)
        if guessed_type and guessed_type in allowed_types:
            return

    allowed = ", ".join(sorted(set(t.split("/")[-1].upper() for t in allowed_types)))
    raise HTTPException(
        status_code=415,
        detail=f"Unsupported file format '{file.content_type or 'unknown'}'. Supported formats: {allowed}"
    )


def validate_size(content: bytes, max_size_mb: int) -> None:
    max_bytes = max_size_mb * 1024 * 1024
    if len(content) > max_bytes:
        file_size_mb = round(len(content) / (1024 * 1024), 1)
        raise HTTPException(
            status_code=413,
            detail=f"Uploaded file ({file_size_mb} MB) exceeds maximum allowed limit of {max_size_mb} MB."
        )


def validate_content(content: bytes, allowed_types: list[str]) -> None:
    major_type = next((content_type.split("/", 1)[0] for content_type in allowed_types), "")
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if major_type == "image":
        try:
            from PIL import Image
            with Image.open(io.BytesIO(content)) as image:
                image.verify()
        except Exception as exc:
            raise HTTPException(status_code=415, detail="The uploaded file is not a readable image.") from exc
    elif major_type == "video":
        valid_header = content.startswith(b"RIFF") or b"ftyp" in content[:64]
        if not valid_header:
            raise HTTPException(status_code=415, detail="The uploaded file is not a readable video.")
    elif major_type == "audio":
        valid_header = content.startswith((b"RIFF", b"OggS", b"ID3", b"fLaC"))
        if not valid_header:
            raise HTTPException(status_code=415, detail="The uploaded file is not a readable audio file.")


def validate_media(file: UploadFile, content: bytes, allowed_types: list[str], max_size_mb: int) -> None:
    validate_upload(file, allowed_types, max_size_mb)
    validate_size(content, max_size_mb)
    validate_content(content, allowed_types)

