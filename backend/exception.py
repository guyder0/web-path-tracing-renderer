from fastapi import Request
from fastapi.responses import JSONResponse


class AppException(Exception):
    status_code: int = 400
    error_code: str = "APP_ERROR"
    message: str = "Произошла ошибка"

    def __init__(self, message: str | None = None, error_code: str | None = None):
        self.message = message or self.message
        self.error_code = error_code or self.error_code
        super().__init__(self.message)


async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.message,
            "error_code": exc.error_code,
            "status_code": exc.status_code,
        }
    )