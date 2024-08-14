"use client";
import Link from "next/link";

import { axios } from "@/axios";
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
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { UserType } from "@/types";
import { userSchema } from "@/validation/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Loader from "@/_components/loader/loader";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import DivWrapper from "@/_components/Divwrapper";

export function SignUp() {
  // messages
  const { errorMessage, successMessage } = useMessage();
  // Loading
  const { isLoading, startLoading, stopLoading } = useLoading();
  // toggling password visibilaty state
  const [isPassVisible, setIsPassVisible] = useState(false);
  // router
  const router = useRouter();
  // React hook form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
  });
  // Create User
  const handleRegisterUser = async (data: UserType) => {
    const { firstName, lastName, email, password } = data;
    try {
      startLoading();
      const response = await axios.post(
        "/auth/registerUser",
        {
          name: `${firstName} ${lastName}`,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data);
      if (response.status === 200) {
        reset();
        successMessage(
          response.data.success &&
            "Please Check Your Email for OTP Verification",
        );
        return router.push("/auth/verify-user");
      }
    } catch (error: any) {
      console.log(error);
      errorMessage(
        error?.response?.data?.error?.message ||
          "Something went wrong while registering user",
      );
      if (error instanceof Error) console.log(error.message);
      else {
        errorMessage("Something went wrong while registering user");
      }
    } finally {
      stopLoading();
    }
  };

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
              className="lowercase"
              placeholder="john@example.com"
            />
            {/* <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link> */}
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
                <DivWrapper className="h-[30px] w-[30px]">
                  {isPassVisible ? <FaEyeSlash /> : <FaEye />}
                </DivWrapper>
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={cn("w-full", isLoading && "cursor-not-allowed")}
          >
            {isLoading ? <Loader /> : <span>Create an account</span>}
          </Button>

          <Button variant="outline" className="w-full" type="button">
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
