import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"

import { useSceneStore } from "@/store/scene-store"

import { ColorPicker } from "@/components/scene-editor-ui/color-picker"

export const ObjectRedactor = () => {
    let selectedId = useSceneStore((state) => state.selectedId)
    let transformMode = useSceneStore((state) => state.transformMode)
    let setTransformMode = useSceneStore((state) => state.setTransformMode)
    let selectedObject = useSceneStore((state) => state.objects.find((obj) => obj.id == selectedId))
    let updateObject = useSceneStore((state) => state.updateObject)

    return (
        <Card className="absolute top-5 left-5">
            <CardHeader>
                <CardTitle>Редактирование выбранного объекта</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 w-120">
                <ButtonGroup className="flex flex-row w-full">
                    <Button size="sm" onClick={() => setTransformMode('translate')}
                    className="flex-1"
                    variant={transformMode == "translate" ? "default" : "outline"}>
                        Перемещение
                    </Button>
                    <ButtonGroupSeparator />
                    <Button size="sm" onClick={() => setTransformMode('rotate')}
                    className="flex-1"
                    variant={transformMode == "rotate" ? "default" : "outline"}>
                        Вращение
                    </Button>
                    <ButtonGroupSeparator />
                    <Button size="sm" onClick={() => setTransformMode('scale')}
                    className="flex-1"
                    variant={transformMode == "scale" ? "default" : "outline"}>
                        Увеличение
                    </Button>
                </ButtonGroup>
                <ButtonGroup className="flex flex-row w-full">
                    <Button size="sm" onClick={() => updateObject(selectedId!, {material: 'diffuse'})}
                    className="flex-1"
                    variant={selectedObject!.material == "diffuse" ? "default" : "outline"}>
                        Матовый
                    </Button>
                    <ButtonGroupSeparator />
                    <Button size="sm" onClick={() => updateObject(selectedId!, {material: 'emitter'})}
                    className="flex-1"
                    variant={selectedObject!.material == "emitter" ? "default" : "outline"}>
                        Излучающий
                    </Button>
                    <ButtonGroupSeparator />
                    <Button size="sm" onClick={() => updateObject(selectedId!, {material: 'dielectric'})}
                    className="flex-1"
                    variant={selectedObject!.material == "dielectric" ? "default" : "outline"}>
                        Приломляющий
                    </Button>
                    <ButtonGroupSeparator />
                    <Button size="sm" onClick={() => updateObject(selectedId!, {material: 'conductor'})}
                    className="flex-1"
                    variant={selectedObject!.material == "conductor" ? "default" : "outline"}>
                        Отражающий
                    </Button>
                </ButtonGroup>
                <ColorPicker value={selectedObject!.color}
                onChange={(color) => updateObject(selectedId!, {color: color})}/>
            </CardContent>
        </Card>
    )
}
