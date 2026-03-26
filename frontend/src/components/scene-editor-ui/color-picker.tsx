import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  className?: string
}

export const ColorPicker = ({ value, onChange, className }: ColorPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[200px] justify-start text-left font-normal", className)}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded border border-muted-foreground/20"
              style={{ backgroundColor: value }}
            />
            <span>{value}</span>
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <HexColorPicker color={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}