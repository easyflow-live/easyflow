import type { Group } from '@/types/types'
import { GroupCard } from './GroupCard'
import { CardAdder } from './CardAdder'

type GroupsProps = {
  groups: Group[]
}

export function Groups({ groups }: GroupsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {groups.map((group) => (
        <Group key={group.id} group={group} />
      ))}
    </div>
  )
}

type GroupProps = {
  group: Group
}

function Group({ group }: GroupProps) {
  return (
    <div className="w-[200px] space-y-4">
      <p className="text-center">{group.title}</p>

      <CardAdder
        index={group.cards.length}
        assigneeId={group.bord.owner.id}
        groupId={group.id}
      />

      {group.cards.map((card) => (
        <GroupCard key={card.id} card={card} />
      ))}
    </div>
  )
}
