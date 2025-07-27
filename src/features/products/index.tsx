import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
//import UsersProvider from './context/users-context'
import { userListSchema } from './data/schema'
import { users } from './data/users'
import axios from 'axios'
import { use } from 'react'
import { useQuery } from '@tanstack/react-query'
import { adminUrl } from '@/config/apiClient'
import ProductProvider from './context/product-context'
import { ProductsDialogs } from './components/products-dialog'
export default function Products() {
  // Parse user list
  const userList = userListSchema.parse(users)

  const { isLoading, error, data } = useQuery({
    staleTime: 10000,
    queryKey: ["product"],
    // retry:true,
    queryFn: () =>
      axios.get(`${adminUrl}/product?page=1&limit=190`, {
        withCredentials: true

      }).then(res => res.data.data)
  })

  if (error) {
    return <div>{error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }



  console.log("data", data)

  return (
   
      <ProductProvider> 
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Products</h2>
            <p className='text-muted-foreground'>
              Manage your products and stocks here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UsersTable data={data?.docs || []} columns={columns} />
        </div>
      </Main>

      {/* <UsersDialogs /> */}
      <ProductsDialogs />
      </ProductProvider>

  )
}
