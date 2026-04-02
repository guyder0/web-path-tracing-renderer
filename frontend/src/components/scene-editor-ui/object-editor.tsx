import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import { useSceneStore } from "@/store/scene-store";
import { ColorPicker } from "@/components/scene-editor-ui/color-picker";
import { PropsEditorModal } from "@/components/scene-editor-ui/props-editor-modal";

const emitterBaseProps = JSON.parse('{"type": "area", "radiance": {"type": "rgb", "value": [18.387, 13.9873, 6.75357]}}');
const dielectricBaseProps = JSON.parse('{"type": "dielectric", "int_ior": "diamond", "ext_ior": "air"}');
const conductorBaseProps = JSON.parse('{"type": "conductor", "material": "Al"}');

export const ObjectRedactor = () => {
  const selectedId = useSceneStore((state) => state.selectedId);
  const transformMode = useSceneStore((state) => state.transformMode);
  const setTransformMode = useSceneStore((state) => state.setTransformMode);
  const selectedObject = useSceneStore((state) =>
    state.objects.find((obj) => obj.id === selectedId)
  );
  const updateObject = useSceneStore((state) => state.updateObject);
  const deleteObject = useSceneStore((state) => state.deleteObject);

  // Состояние модального окна
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState<"emitter" | "bsdf">("emitter");
  const [currentProps, setCurrentProps] = useState("");

  const openEditor = (type: "emitter" | "bsdf", title: string) => {
    const props = type === "emitter"
      ? selectedObject?.emitterProps
      : selectedObject?.bsdfProps;

    setModalType(type);
    setModalTitle(title);
    setCurrentProps(props || (type === "emitter" ? emitterBaseProps : dielectricBaseProps));
    setModalOpen(true);
  };

  const handleSaveProps = (newJson: object) => {
    if (!selectedId) return;

    if (modalType === "emitter") {
      updateObject(selectedId, {
        emitterProps: newJson,
        material: "emitter"
      });
    } else {
      updateObject(selectedId, {
        bsdfProps: newJson,
        material: selectedObject!.material
      });
    }
  };

  if (!selectedObject) return null;

  const isEmitter = selectedObject.material === "emitter";
  const isDielectricOrConductor =
    selectedObject.material === "dielectric" ||
    selectedObject.material === "conductor";

  return (
    <Card className="absolute top-5 left-5">
      <CardHeader>
        <CardTitle>Редактирование выбранного объекта</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 w-120">
        {/* Группа трансформаций */}
        <ButtonGroup className="flex flex-row w-full">
          <Button size="sm" onClick={() => setTransformMode('translate')}
            className="flex-1"
            variant={transformMode === "translate" ? "default" : "outline"}>
            Перемещение
          </Button>
          <ButtonGroupSeparator />
          <Button size="sm" onClick={() => setTransformMode('rotate')}
            className="flex-1"
            variant={transformMode === "rotate" ? "default" : "outline"}>
            Вращение
          </Button>
          <ButtonGroupSeparator />
          <Button size="sm" onClick={() => setTransformMode('scale')}
            className="flex-1"
            variant={transformMode === "scale" ? "default" : "outline"}>
            Увеличение
          </Button>
        </ButtonGroup>

        {/* Материалы */}
        <ButtonGroup className="flex flex-row w-full">
          <Button
            size="sm"
            onClick={() => {
              if (selectedObject.material === "emitter") {
                updateObject(selectedId!, {
                  material: "diffuse",
                  bsdfProps: undefined,
                  emitterProps: undefined
                });
              } else {
                updateObject(selectedId!, {
                  material: "emitter",
                  bsdfProps: undefined,
                  emitterProps: emitterBaseProps
                });
              }
            }}
            className="flex-1"
            variant={selectedObject.material === "emitter" || selectedObject.material === "diffuse" ? "default" : "outline"}
          >
            {selectedObject.material === "emitter" ? "Излучающий" : "Матовый"}
          </Button>

          <ButtonGroupSeparator />

          <Button
            size="sm"
            onClick={() => updateObject(selectedId!, {
              material: 'dielectric',
              emitterProps: undefined,
              bsdfProps: dielectricBaseProps
            })}
            className="flex-1"
            variant={selectedObject.material === "dielectric" ? "default" : "outline"}
          >
            Приломляющий
          </Button>

          <ButtonGroupSeparator />

          <Button
            size="sm"
            onClick={() => updateObject(selectedId!, {
              material: 'conductor',
              emitterProps: undefined,
              bsdfProps: conductorBaseProps
            })}
            className="flex-1"
            variant={selectedObject.material === "conductor" ? "default" : "outline"}
          >
            Отражающий
          </Button>
        </ButtonGroup>

        {/* Новые кнопки редактирования свойств */}
        <div className="flex flex-col gap-2">
          {isEmitter && (
            <Button
              variant="secondary"
              onClick={() => openEditor("emitter", "Редактирование излучения (emitterProps)")}
            >
              Редактировать излучение (emitterProps)
            </Button>
          )}

          {isDielectricOrConductor && (
            <Button
              variant="secondary"
              onClick={() => openEditor("bsdf", "Редактирование материала (bsdfProps)")}
            >
              Редактировать материал (bsdfProps)
            </Button>
          )}
        </div>

        <div className="flex flex-row gap-4 justify-between">
          <ColorPicker
            value={selectedObject.color}
            className="flex-1"
            onChange={(color) => updateObject(selectedId!, { color })}
          />
          <Button onClick={() => deleteObject(selectedId!)} className="flex-1" variant="destructive">
            Удалить
          </Button>
        </div>
      </CardContent>

      {/* Модальное окно */}
      <PropsEditorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        initialJson={currentProps}
        onSave={handleSaveProps}
        type={modalType}
      />
    </Card>
  );
};