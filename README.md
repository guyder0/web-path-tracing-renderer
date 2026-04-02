## Требования

**Frontend:**
- Node.js 18+
- npm

**Backend:**
- Python 3.10+
- Mitsuba 3
- Pillow, FastAPI, uvicorn, python-multipart

---

## Установка и запуск

### 1. Клонирование
```bash
git clone https://github.com/guyder0/web-path-tracing-renderer.git
cd web-path-tracing-renderer
```

### 2. Frontend (веб-часть)
```bash
cd frontend
npm install
npm run dev
```

Откроется по адресу `http://localhost:5173` (или другой порт).
Для production-сборки:
```bash
npm run build
```

### 3. Backend (Python + Mitsuba)
```bash
cd backend
```

# Создаём виртуальное окружение (рекомендуется)
```bash
python -m venv venv
source venv/bin/activate    # Linux / Mac
# venv\Scripts\activate     # Windows
```

# Установка зависимостей
```bash
pip install fastapi uvicorn python-multipart
```

# Установка Mitsuba 3 (официальный способ)
```bash
pip install mitsuba
```
Запуск сервера:
```bash
uvicorn main:app --reload --port 8000
```

# Важно: Если возникают проблемы с рендерингом — правь `mi.set_variant()` в файле `backend/core/renderer.py`