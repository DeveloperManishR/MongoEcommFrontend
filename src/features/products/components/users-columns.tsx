import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { Product } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-40'>{row.getValue('title')}</LongText>
    ),
    meta: {
      className: cn(
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => (
      <span className='capitalize'>{row.getValue('category')}</span>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price ($)' />
    ),
    cell: ({ row }) => <div>${row.getValue('price')}</div>,
  },
  {
    accessorKey: 'discountPercentage',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Discount (%)' />
    ),
    cell: ({ row }) => <div>{row.getValue('discountPercentage')}%</div>,
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rating' />
    ),
    cell: ({ row }) => <div>{row.getValue('rating')}</div>,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stock' />
    ),
    cell: ({ row }) => <div>{row.getValue('stock')}</div>,
  },
  {
    accessorKey: 'availabilityStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Availability' />
    ),
    cell: ({ row }) => (
      <Badge
        variant='outline'
        className={cn('capitalize', {
          'text-green-600 border-green-600': row.getValue('availabilityStatus') === 'In Stock',
          'text-red-600 border-red-600': row.getValue('availabilityStatus') === 'Out of Stock',
        })}
      >
        {row.getValue('availabilityStatus')}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'returnPolicy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Return Policy' />
    ),
    cell: ({ row }) => <div>{row.getValue('returnPolicy')}</div>,
  },
  {
    accessorKey: 'minimumOrderQuantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Min. Qty' />
    ),
    cell: ({ row }) => <div>{row.getValue('minimumOrderQuantity')}</div>,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]
