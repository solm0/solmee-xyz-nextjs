import { Tag } from 'lucide-react';
import InspectTag from './inspect-tag';
import { Suspense } from 'react';

const tags = [
  {
    value: 'code',
    name: '코딩',
  },
  {
    value: 'work',
    name: '창작',
  },
  {
    value: 'travel',
    name: '방랑',
  },
  {
    value: 'book',
    name: '독서',
  },
  {
    value: 'etc',
    name: '미분류',
  },
]

export default function NoteInspector() {
  return (
    <section className="mt-24 h-auto w-full flex flex-col gap-8 items-start text-sm">
      <Suspense>
        <div>
          <label
            className='flex items-center gap-2 text-text-800'
            htmlFor='tagInput'
          >
            <Tag className='w-3 h-3' />
            태그
          </label>
          <InspectTag tags={tags} />
        
        </div>
      </Suspense>
    </section>
  )
}