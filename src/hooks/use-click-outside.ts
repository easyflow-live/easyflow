import { RefObject, useEffect } from 'react'
import { usePrevious } from './use-previous'

function isInDOM(obj: any) {
  return Boolean(obj.closest('body'))
}

function hasParent(element: Node | null, root: HTMLElement) {
  return root.contains(element) && isInDOM(element)
}

export const useClickOutside = ({
  element,
  active,
  onClick,
}: {
  element: RefObject<HTMLElement>
  active: boolean
  onClick: (e: MouseEvent | TouchEvent) => void
}) => {
  const previousActive = usePrevious(active)

  useEffect(() => {
    if (!element) return

    const handleClick = (event: MouseEvent | TouchEvent) => {
      const { current } = element

      if (!current) return

      if (!hasParent(event.target as Node, current)) {
        if (typeof onClick === 'function') {
          onClick(event)
        }
      }
    }

    if (active) {
      document.addEventListener('mousedown', handleClick)
      document.addEventListener('touchstart', handleClick)
    }

    if (!previousActive && active) {
      document.addEventListener('mousedown', handleClick)
      document.addEventListener('touchstart', handleClick)
    }

    if (previousActive && !active) {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }

    return () => {
      if (active) {
        document.removeEventListener('mousedown', handleClick)
        document.removeEventListener('touchstart', handleClick)
      }
    }
  }, [active, element, onClick, previousActive])
}
