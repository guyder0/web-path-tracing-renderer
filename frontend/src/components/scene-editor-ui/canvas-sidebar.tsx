import { ArrowDownIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CanvasForm } from "@/components/scene-editor-ui/canvas-form"
import { useSceneStore } from "@/store/scene-store"

const CanvasRedactor = () => {
  const addObject = useSceneStore((state) => state.addObject)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Добавить объект <ArrowDownIcon/></Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex flex-col max-h-32 w-48 overflow-y-auto">
        <Button variant="ghost" onClick={() => addObject("cube")}>Куб</Button>
        <Button variant="ghost" onClick={() => addObject("sphere")}>Сфера</Button>
        <Button variant="ghost" onClick={() => addObject("cube")}>Плоскость</Button>
      </PopoverContent>
    </Popover>
  )
}

export const CanvasSidebar = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Редактор</CardTitle>
        <CardDescription>
          Добавьте объекты, настройте качество рендера и отправьте сцену на сервер
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-5 items-start overflow-y-auto">
        <CanvasRedactor/>
        <CanvasForm formId="render-form"/>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          form="render-form"
          >Отрендерить
        </Button>
        <Button variant="outline" className="w-full">
          Сохранить в галлерею
        </Button>
      </CardFooter>
    </Card>
  )
}
