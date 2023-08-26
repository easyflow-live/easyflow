import { useParams } from 'next/navigation'

export function useBoardId() {
  const params = useParams()
  return params.id
}
