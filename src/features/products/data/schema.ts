import { z } from 'zod'





const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
])
const productStatusSchema = z.union([
  z.literal('In Stock'),
  z.literal('Out of Stock'),
  z.literal('Low Stock'),
  // z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>
export type ProductStatus = z.infer<typeof productStatusSchema>

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
const productSchema = z.object({
  _id: z.string(), // use string to match _id in the JSON
  title: z.string(),
  description: z.string(),
 category: z.object({
    _id: z.string(),
    name: z.string()
  }),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  images: z.array(z.string().url()),
  thumbnail: z.string().url(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  isActive: z.boolean(),
})
export type User = z.infer<typeof userSchema>
export type Product = z.infer<typeof productSchema>

export const userListSchema = z.array(userSchema)
