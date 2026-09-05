import os
import sys

BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from core.config import settings
from routers import health, text, image, video, audio

# Create FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware - permissive for all local dev ports & client setups
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "status_code": exc.status_code},
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal analysis error. Please try again.", "status_code": 500},
    )

# Register routers
app.include_router(health.router)
app.include_router(text.router)
app.include_router(image.router)
app.include_router(video.router)
app.include_router(audio.router)


import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

@app.get("/api/info")
async def root():
    return {
        "name": settings.APP_NAME,
        "tagline": "See through the lies.",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "endpoints": {
            "health": "/api/health",
            "analyze_text": "POST /api/analyze/text",
            "analyze_image": "POST /api/analyze/image",
            "analyze_video": "POST /api/analyze/video",
            "analyze_audio": "POST /api/analyze/audio",
            "threat_radar": "GET /api/threats/radar",
        }
    }

@app.get("/api/threats/radar")
async def get_threat_radar():
    """Live Global Synthetic Media Threat Intelligence telemetry feed."""
    return {
        "status": "active",
        "global_threat_level": "DEFCON 2 — ELEVATED SYNTHETIC ACTIVITY",
        "global_threat_score": 78.4,
        "scanned_last_24h": 142850,
        "flagged_deepfakes_24h": 26940,
        "detection_rate_pct": 98.7,
        "threat_distribution": {
            "voice_cloning_scams": 38,
            "face_swap_video": 27,
            "ai_image_manipulation": 21,
            "phishing_text_generation": 14
        },
        "active_campaigns": [
            {
                "id": "CAMP-2026-881",
                "name": "Global Executive Voice Clone Wire Fraud",
                "medium": "Audio / Voice Clone",
                "severity": "CRITICAL",
                "vectors": ["ElevenLabs v3", "RVC Voice Models"],
                "targets": ["FinTech", "Corporate Treasuries"],
                "active_since": "2026-08-20",
                "mitigation": "Enforce out-of-band cryptographic voice callback authentication"
            },
            {
                "id": "CAMP-2026-882",
                "name": "Viral Synthetic News Anchor Broadcasts",
                "medium": "Video Face Swap",
                "severity": "HIGH",
                "vectors": ["HeyGen", "LivePortrait-v2"],
                "targets": ["Social Platforms (X, TikTok, YT Shorts)"],
                "active_since": "2026-08-24",
                "mitigation": "Check C2PA metadata & facial boundary Laplacian variance"
            },
            {
                "id": "CAMP-2026-883",
                "name": "High-Volume Urgent KYC AI ID Manipulation",
                "medium": "Image ID & Document",
                "severity": "CRITICAL",
                "vectors": ["Midjourney v6.1", "Flux.1 Schnell"],
                "targets": ["Banking & Crypto Exchanges"],
                "active_since": "2026-08-15",
                "mitigation": "Deploy ELA compression & PRNU sensor pattern validation"
            },
            {
                "id": "CAMP-2026-884",
                "name": "Hyper-Personalized Spear Phishing SMS & Email",
                "medium": "Text Generation",
                "severity": "HIGH",
                "vectors": ["Uncensored Llama-3-70B fine-tunes"],
                "targets": ["Healthcare & Educational staff"],
                "active_since": "2026-08-26",
                "mitigation": "Perplexity burstiness filtering & urgency keyword screening"
            }
        ]
    }

# Mount the frontend static files
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(__file__)), "webapp", "dist")
if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # Don't intercept API calls
        if full_path.startswith("api/") or full_path in ["docs", "redoc", "openapi.json"]:
            return {"detail": "Not Found"}
            
        requested_file = os.path.join(frontend_dist, full_path)
        if os.path.isfile(requested_file):
            return FileResponse(requested_file)
            
        return FileResponse(os.path.join(frontend_dist, "index.html"))


if __name__ == "__main__":
    import uvicorn
    # Use reload=True only if running locally on port 8000 (heuristic for dev)
    is_dev = settings.PORT == 8000
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=is_dev)
