import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { LoginV } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { useToast } from "@/hooks/use-toast";
import { useSignInAccount } from "@/lib/query/queries";
import { useUserContext } from "@/context/AuthContext";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof LoginV>>({
    resolver: zodResolver(LoginV),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Queries

  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  // Handler
  const handleLogin = async (user: z.infer<typeof LoginV>) => {
    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({
          title: "Something went wrong. Please login your new account",
        });

        navigate("/login");

        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="space-y-4 flex-v items-center">
      <h1 className="h2-bold text-center">Welcom to IDAN platforme</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex-v gap-4 w-72 md:w-80"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Email Address"
                    className="input"
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
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="button font-bold text-[20px] text-white"
          >
            {isUserLoading || isPending ? (
              <div className="flex-center gap-2">
                <LuLoader size={20} className=" animate-spin" />
              </div>
            ) : (
              "Login"
            )}
          </Button>
          {/*
          <p className="text-primary-2 text-center transition duration-300 hover:scale-125">
            <Link
              to="/recover-password"
              className="font-semibold  hover:text-rose-500"
            >
              Forgot password?
            </Link>
          </p> */}

          <p className="mt-3 p-1 text-center transition duration-300 hover:scale-110 group">
            Don't have an account yet? <br></br>
            <Link
              to="/create-account"
              className="ml-1 px-2 py-1 group-hover:button-2"
            >
              <span className="text-primary-2 text-[20px] font-semibold group-hover:text-white">
                Create Account
              </span>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};
export default Login;
