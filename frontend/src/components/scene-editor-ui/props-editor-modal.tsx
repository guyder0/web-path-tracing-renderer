import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PropsEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialJson: string;
  onSave: (newJson: object) => void;
  type: "emitter" | "bsdf";
}

export const PropsEditorModal = ({
  isOpen,
  onClose,
  title,
  initialJson,
  onSave,
  type,
}: PropsEditorModalProps) => {
  const [jsonValue, setJsonValue] = useState(JSON.stringify(initialJson, null, 2));
  const [error, setError] = useState<string | null>(null);

  // Сбрасываем значение при открытии модалки
  useEffect(() => {
    if (isOpen) {
      setJsonValue(JSON.stringify(initialJson, null, 2) || (type === "emitter" ? "{}" : "{}"));
      setError(null);
    }
  }, [isOpen, initialJson, type]);

  const handleSave = () => {
    try {
      onSave(JSON.parse(jsonValue));
      onClose();
    } catch (e) {
      setError("Неверный формат JSON. Проверьте синтаксис.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col gap-3">
          <Textarea
            value={jsonValue}
            onChange={(e) => {
              setJsonValue(e.target.value);
              setError(null);
            }}
            className="font-mono text-sm min-h-[400px] resize-y"
            placeholder='{"type": "area", "radiance": {...}}'
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-xs text-muted-foreground">
            Редактируйте JSON свойства. После сохранения изменения применятся к объекту.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            Сохранить изменения
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};