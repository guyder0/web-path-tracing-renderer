import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SceneEditor } from "@/components/scene-editor"
import { SceneGallery } from "@/components/scene-gallery"
import { CodeExplorer } from "@/components/code-explorer"
import { ServerStatus } from "@/components/scene-editor-ui/server-status"

export default function App() {
  return (
    <div className="h-screen bg-background text-foreground">
      <Tabs defaultValue="editor" className="w-full h-full flex flex-col">
        <header className="border-b px-6 py-3 flex items-center justify-between">
          <TabsList variant="line" className="w-[400px] grid grid-cols-3">
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="code">Source</TabsTrigger>
          </TabsList>

          <ServerStatus/>
        </header>

        {/* Контент страниц */}
        <TabsContent value="editor">
          <SceneEditor />
        </TabsContent>

        <TabsContent value="gallery">
          <SceneGallery />
        </TabsContent>

        <TabsContent value="code">
          <CodeExplorer />
        </TabsContent>
      </Tabs>
    </div>
  );
}