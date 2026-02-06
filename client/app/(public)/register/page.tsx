"use client"
import { useSigninMutation, useSignoutMutation, useSignupMutation } from '@/redux/apis/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Register = () => {
    const router = useRouter()
    const [signup] = useSignupMutation()
    const registerSchema = z.object({

        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),

    })
    type registerType = z.infer<typeof registerSchema>


    const { reset, register, formState: { errors }, handleSubmit } = useForm<registerType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(registerSchema)
    })
    const handleLogin = async (data: registerType) => {
        try {
            await signup(data).unwrap()
            toast.success("register success")
            reset()
            router.push("/")
        } catch (error) {
           
            console.log(error)
            toast.error("unable to register")
        }

    }
    return <>
        <form onSubmit={handleSubmit(handleLogin)}>
            <input type="text"placeholder='name'{...register("name")} />
            <input type="email"placeholder='email'{...register("email")} />
            <input type="password"placeholder='password'{...register("password")} />
            <button type='submit'>Register</button>
        </form>
    </>
}

export default Register