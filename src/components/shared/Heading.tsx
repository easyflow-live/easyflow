interface HeadingProps {
  text: string
}

export function Heading({ text }: HeadingProps) {
  return (
    <h2 className="text-foreground text-2xl tracking-tight font-semibold">
      {text}
    </h2>
  )
}

export default Heading
