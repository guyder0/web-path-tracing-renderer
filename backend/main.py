from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import gallery, render
from exception import AppException, app_exception_handler

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(gallery.router, prefix="/gallery")
app.include_router(render.router, prefix="/render")

app.add_exception_handler(AppException, app_exception_handler)

@app.get("/health")
def health_check():
    return {"status": "ok"}