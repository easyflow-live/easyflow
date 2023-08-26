import cn from 'classnames'

export function FakeMember({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `
        inline-block border
        bg-gray-400
        rounded-full
        h-7
        w-7
        justify-center
        items-center
        cursor-default
      `,
        className
      )}
      {...props}
    />
  )
}
