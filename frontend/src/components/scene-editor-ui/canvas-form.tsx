import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  width: z
    .number()
    .min(256, "Ширина экрана не менее 256 (144p).")
    .max(3840, "Ширина экрана не более 3840 (4K)."),
  height: z
    .number()
    .min(144, "Высота экрана не менее 144 (144p).")
    .max(2160, "Высота экрана не более 2160 (4K)."),
  spp: z
    .number()
    .min(64)
    .max(512),
})

export const CanvasForm = ({ formId }: { formId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: 1920,
      height: 1080,
      spp: 256,
    },
  })

  function OnSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <form id={formId} className="w-full" onSubmit={form.handleSubmit(OnSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="width"
            control={form.control}
            render={({ field, fieldState } :any) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Width</FieldLabel>
              <Input
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="1920"
              autoComplete="off"
              />
              {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
              )}
            </Field>
            )}
          />
          <Controller
              name="height"
              control={form.control}
              render={({ field, fieldState } :any) => (
              <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Height</FieldLabel>
                  <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="1080"
                  autoComplete="off"
                  />
                  {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                  )}
              </Field>
              )}
          />
        </div>
        <Controller
          name="spp"
          control={form.control}
          render={({ field, fieldState } :any) => (
          <Field>
            <FieldLabel>
              <Label>SPP</Label>
              <Label className="text-muted-foreground">{field.value}</Label>
            </FieldLabel>
            <Slider
              min={64}
              max={512}
              step={1}
              value={[field.value]}
              onValueChange={([val]: number[]) => field.onChange(val)}
              className="py-4"
            />
            {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
            )}
            <FieldDescription>
              SPP - samples per pixel (сколько лучей будет выпущено в каждый пиксель)
            </FieldDescription>
          </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
