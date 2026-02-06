"use client"
import { useSigninMutation } from '@/redux/apis/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Login = () => {
  const router = useRouter()
  const [signin] = useSigninMutation()
  const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  })
  type loginType = z.infer<typeof loginSchema>


  const { reset, register, formState: { errors }, handleSubmit } = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })
  const handleLogin = async (data: loginType) => {
    try {
      await signin(data).unwrap()
      toast.success("user login success")
      router.push("/admin")
      reset()
    } catch (error) {

      console.log(error)
      toast.error("unable to login ")
    }
  }
  return <>
    <form onSubmit={handleSubmit(handleLogin)}>
      <input type="email" placeholder='email'{...register("email")} />
      <input type="password" placeholder='password'{...register("password")} />
      <button type='submit'>Login</button>
    </form>
  </>
}

export default Login