import { HTMLAttributes, HTMLProps, ReactNode, useId } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type InputProps = HTMLProps<HTMLInputElement> & HTMLAttributes<HTMLInputElement> & {
  button?: ReactNode
  label?: string
  value?: string
}

export default function CustomInput({
  button,
  label,
  value,
  ...restProps
}: InputProps) {
  const inputId = useId()


  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {(label !== undefined) && <Label htmlFor={inputId}>{label}</Label>}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          value={value}
          id={inputId}
          {...restProps}
        />
        {button}
      </div>
    </div>
  )
}