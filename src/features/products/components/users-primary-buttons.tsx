import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
//import { useUsers } from '../context/users-context'
import { useProduct } from '../context/product-context'

export function UsersPrimaryButtons() {
  const { setOpen } = useProduct()
  return (
    <div className='flex gap-2'>
      {/* <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Invite User</span> <IconMailPlus size={18} />
      </Button> */}
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Product</span> <IconUserPlus size={18} />
      </Button>
    </div>
  )
}
