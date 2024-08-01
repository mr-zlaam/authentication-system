"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validation/zod";
import { UserType } from "@/types";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";

export function SignUp() {
  // toggling password visibilaty state
  const [isPassVisible, setIsPassVisible] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
  });
  // Create User
  const handleRegisterUser = async () => {};
  return (
    <Card
      className="mx-auto max-w-sm"
      onSubmit={handleSubmit(handleRegisterUser)}
    >
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <p className="text-xs text-red-500">
                {errors && errors.firstName && errors.firstName.message}
              </p>

              <Input
                {...register("firstName")}
                id="first-name"
                placeholder="John"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <p className="text-xs text-red-500">
                {errors && errors.lastName && errors.lastName.message}
              </p>

              <Input
                {...register("lastName")}
                id="last-name"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <p className="text-xs text-red-500">
              {errors && errors.email && errors.email.message}
            </p>

            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="john@example.com"
            />
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <p className="text-xs text-red-500">
              {errors && errors.password && errors.password.message}
            </p>
            <div className="relative">
              <Input
                {...register("password")}
                id="password"
                type={isPassVisible ? "text" : "password"}
                className="pr-10"
              />
              <span
                onClick={() => setIsPassVisible(!isPassVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {isPassVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            <FcGoogle className="mr-2 h-4 w-4" />
            Sign up with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
