import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ImageModalProps {
  isLoading: boolean,
  imageUrl: string | undefined,
  onClose: () => void
}

export const ImageModal = ({ imageUrl, onClose, isLoading }: ImageModalProps) => {
  if (!isLoading && !imageUrl) { return null }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred backdrop overlay */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {isLoading && (
        <Loader2 className="h-12 w-12 animate-spin text-white mb-4" />
      )}

      {/* Modal content */}
      {imageUrl &&
      <div className="relative z-10 flex flex-col justify-center p-4 w-full">
        {/* Close button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute -top-12 right-12 bg-background hover:bg-background/80"
          onClick={onClose}
        >
          <XIcon className="h-4 w-4" />
        </Button>

        {/* Image */}
        <img
          src={imageUrl}
          alt="Картинка не загрузилась"
          className="w-auto h-[75vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
      }
    </div>
  )
}
