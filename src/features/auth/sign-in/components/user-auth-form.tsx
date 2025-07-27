import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { publicUrl } from '@/config/apiClient'

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'admin@gmail.com',
      password: '12345678',
    },
  })
  

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      axios.post(`${publicUrl}/public/login`, data,{
        withCredentials: true,
      }),
    
    onMutate: () => setIsLoading(true),
/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Called when the login request is successful.
     *
     * @param response The response from the server.
     *
     * @example
     * onSuccess: (response) => {
     *   // Redirect to the dashboard
     *   router.transitionTo('/dashboard')
     * }
     */
/*******  53b42c37-66d7-4ae0-a9f9-0a531f668310  *******/    onSettled: () => setIsLoading(false),

    onSuccess: (response) => {
      console.log('Login successful', response.data)
       
      navigate({ to: '/' })
      //navigate({ to: '/apps' })
      // Add redirect or success message here
    },
    onError: (error) => {
      console.error('Login failed', error)
      // Optionally show error to user
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
     // navigate({ to: '/' })
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}

