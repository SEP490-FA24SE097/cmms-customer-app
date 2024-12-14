"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { Checkbox } from "@/components/ui/checkbox";
import { createAccount } from "@/lib/actions/sign_up/action/sign_up";
import { CiMail } from "react-icons/ci";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Define Zod schema for form validation
const registerSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được bỏ trống."),
  email: z.string().email("Email không hợp lệ."),
  userName: z.string().min(6, "Tên tài khoản phải có ít nhất 6 ký tự."),
  password: z.string().min(1, "Mật khẩu không được bỏ trống."),
  taxCode: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isChecked, setIsChecked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      userName: "",
      password: "",
      taxCode: undefined,
    },
  });
  // Define the handler for checkbox state change
  const handleCheckboxChange = (checked: boolean) => {
    // Convert CheckedState to boolean and update the state
    setIsChecked(checked === true);
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const response = await createAccount(values);
      if (response.data.length > 0) {
        toast({
          title: "Đăng ký thành công",
          description: "Hãy xác nhận mail của bạn",
          style: { backgroundColor: "#73EC8B", color: "#ffffff" },
        });
        setIsRegistered(true);
      } else if (response.error) {
        toast({
          title: response.error,
          description: "Vui lòng thử lại",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Đăng ký thật bại",
        description: "Đăng ký thất bại vui lòng thử lại",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  console.log(isRegistered);
  // const onSubmit = async (values: RegisterFormValues) => {
  //   console.log(values);
  // };

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white md:grid-cols-2 box-animate">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col pb-10">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="my-4 flex items-center flex-col">
            <h1 className="text-3xl font-bold lg:text-4xl">
              Tạo tài khoản mới
            </h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-56 lg:w-1/3"
            >
              <FormField
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Họ và tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tài khoản</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên tài khoản" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Mật khẩu"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isChecked && (
                <FormField
                  name="taxCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã số thuế</FormLabel>
                      <FormControl>
                        <Input placeholder="Mã số thuế" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex gap-3 items-center mt-2">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={handleCheckboxChange}
                  className="border-white checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <h1 className="text-[14px] italic underline underline-offset-2 decoration-1">
                  Tài khoản doanh nghiệp
                </h1>
              </div>
              {loading ? (
                <Button
                  type="submit"
                  className="w-full mt-5 rounded-full font-bold bg-slate-500"
                >
                  Loading...
                </Button>
              ) : isRegistered ? (
                <Link href="/login">
                  <Button
                    className="w-full mt-5 rounded-full font-bold bg-green-600 hover:bg-green-700"
                    onClick={() =>
                      window.open(
                        "https://mail.google.com/mail",
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <CiMail size={20} />
                    Xác nhận qua email
                  </Button>
                </Link>
              ) : (
                <Button
                  type="submit"
                  className="w-full mt-5 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700"
                >
                  Đăng ký
                </Button>
              )}
            </form>
            <p className="mt-3 flex justify-center text-sm font-light text-gray-500 dark:text-gray-400">
              Tôi đã có tài khoản?&nbsp;
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Đang nhập
              </Link>
            </p>
          </Form>
        </div>
        <div className="relative hidden md:block">
          <Image
            src="/bg.jpg"
            className="object-cover"
            fill={true}
            alt="Background image"
          />
        </div>
      </div>
    </main>
  );
}
