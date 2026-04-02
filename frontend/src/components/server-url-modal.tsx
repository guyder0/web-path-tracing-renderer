import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XIcon, CheckCircle, AlertCircle } from "lucide-react";

interface ServerUrlModalProps {
  isOpen: boolean;
  currentUrl: string;
  onClose: () => void;
  onSave: (url: string) => void;
}

export const ServerUrlModal = ({
  isOpen,
  currentUrl,
  onClose,
  onSave,
}: ServerUrlModalProps) => {
  const [urlInput, setUrlInput] = useState(currentUrl);
  const [isValid, setIsValid] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Сброс при открытии
  useEffect(() => {
    if (isOpen) {
      setUrlInput(currentUrl);
      setIsValid(true);
      setErrorMessage("");
    }
  }, [isOpen, currentUrl]);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleCheck = async () => {
    if (!isValidUrl(urlInput)) {
      setIsValid(false);
      setErrorMessage("Введите корректный URL (например: http://localhost:8000)");
      return;
    }

    setIsChecking(true);
    setErrorMessage("");

    try {
      // Простая проверка доступности сервера (HEAD запрос)
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут

      const response = await fetch(`${urlInput}/docs`, {
        method: "HEAD",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (response.ok || response.status === 404) { // /docs обычно существует в FastAPI
        setIsValid(true);
        setErrorMessage("Сервер доступен ✓");
      } else {
        setIsValid(false);
        setErrorMessage(`Сервер ответил статусом: ${response.status}`);
      }
    } catch (err) {
      setIsValid(false);
      setErrorMessage("Не удалось подключиться к серверу. Проверьте URL и что сервер запущен.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleSave = () => {
    if (!isValidUrl(urlInput)) {
      setIsValid(false);
      setErrorMessage("Некорректный URL");
      return;
    }

    onSave(urlInput.trim());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Настройки сервера</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XIcon className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="server-url" className="text-zinc-400">
              URL сервера FastAPI
            </Label>
            <Input
              id="server-url"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                setIsValid(true);
                setErrorMessage("");
              }}
              placeholder="http://localhost:8000"
              className="mt-1 font-mono text-sm"
            />
          </div>

          {errorMessage && (
            <div className={`flex items-center gap-2 text-sm ${isValid ? "text-green-400" : "text-red-400"}`}>
              {isValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              onClick={handleCheck}
              disabled={isChecking || !urlInput}
              variant="secondary"
              className="flex-1"
            >
              {isChecking ? "Проверка..." : "Проверить подключение"}
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isValid || isChecking || !urlInput}
              className="flex-1"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};