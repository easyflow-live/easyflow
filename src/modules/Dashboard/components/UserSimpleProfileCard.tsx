import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Label } from '@/components/ui/Label'

type UserSimpleProfileCardProps = {
  username: string
  photo?: string
  email: string
}

export function UserSimpleProfileCard({
  username,
  photo,
  email,
}: UserSimpleProfileCardProps) {
  return (
    <div className="flex items-center gap-3 p-2">
      <Avatar>
        <AvatarImage src={photo} />
        <AvatarFallback>{username.slice(1, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <Label>{username}</Label>
        <p className="text-gray-500">{email}</p>
      </div>
    </div>
  )
}
