"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useLoginModal from "@/hooks/modals/useLoginModal";

const SignInPage = () => {
  const form = useForm();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState();
  const { toast } = useToast();
  const loginModal = useLoginModal();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = form.getValues("username");
    const password = form.getValues("password");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      console.log(res);

      if (res?.error) {
        console.log(res);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Username or Password invalid!",
        });
        return;
      }

      loginModal.onClose()
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[450px]">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-center">Sign In</CardTitle>
          <CardDescription className="flex justify-center">
            Welcom to store!
          </CardDescription>
        </CardHeader>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 w-full">
          <CardContent>
            <Form {...form}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={isLoading}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" className="w-full">
              Sing In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
