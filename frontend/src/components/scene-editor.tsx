import { CanvasSidebar } from "@/components/scene-editor-ui/canvas-sidebar"
import { CanvasPlayground } from "@/components/scene-editor-ui/canvas-playground"
import { ObjectRedactor } from "@/components/scene-editor-ui/object-redactor"

import { useSceneStore } from "@/store/scene-store"

export const SceneEditor = () => {
  let selectedId = useSceneStore((state) => state.selectedId)

  return (
    <div className="h-full flex gap-4 p-2">
        <div className="relative flex-grow rounded-xl overflow-hidden border border-slate-800">
          <CanvasPlayground/>
          {
          selectedId &&
          <ObjectRedactor/>
          }
          <code className="absolute top-2 right-2 select-none">
            <div>ЛКМ - вращение камеры</div>
            <div>ПКМ - перемещение камеры</div>
            <div>-/+ - изменить fov</div>
            <div>g - вкл/выкл сетку</div>
          </code>
        </div>

        <CanvasSidebar/>
    </div>
  );
}