import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { UsersDialogs } from './components/products-dialogs'
import { UsersPrimaryButtons } from './components/products-primary-buttons'
import { users } from './data/users'
import { ProductsProvider } from './components/products-provider'
import { ProductsTable } from './components/products-table'

const route = getRouteApi('/_authenticated/products/')

export function Prodcuts() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  return (
    <ProductsProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Products List</h2>
            <p className='text-muted-foreground'>
              Manage your Products and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <ProductsTable data={users} search={search} navigate={navigate} />
        </div>
      </Main>

      <UsersDialogs />
    </ProductsProvider>
  )
}
