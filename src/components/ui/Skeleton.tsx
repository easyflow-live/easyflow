import cn from 'classnames'

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse bg-muted', className)} {...props} />
}
