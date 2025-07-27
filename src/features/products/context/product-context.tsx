import React, { useState } from 'react'

import useDialogState from '@/hooks/use-dialog-state'

import { Product } from '../data/schema'

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface ProductContextType {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: Product | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Product | null>>
}

const ProductContext = React.createContext<ProductContextType | null>(null)

interface Props {
  children: React.ReactNode
}
export default function ProductProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Product | null>(null)

  return (
    <ProductContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </ProductContext>
  )
}


export const useProduct = () => {
  const productContext = React.useContext(ProductContext)

  if (!productContext) {
    throw new Error('useUsers has to be used within <UsersContext>')
  }

  return productContext
}
