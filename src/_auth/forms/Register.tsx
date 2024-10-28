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
import { RegisterV } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { useToast } from "@/hooks/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/query/queries";
import { useUserContext } from "@/context/AuthContext";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof RegisterV>>({
    resolver: zodResolver(RegisterV),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();

  // Handler
  const handleRegister = async (user: z.infer<typeof RegisterV>) => {
    try {
      // Capitalize Name
      const firstname =
        user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1);
      const lastname =
        user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);
      const name = `${firstname} ${lastname}`;
      const submitData = {
        name,
        email: user.email,
        password: user.password,
      };
      const newUser = await createUserAccount(submitData);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again." });

        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account" });

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
    <div className="space-y-4">
      <h1 className="h2-bold text-center">Create your account</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="flex-v gap-4 w-72 md:w-80"
        >
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="First Name"
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Last Name"
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
          <Button type="submit" className="button font-bold text-[20px]">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <LuLoader size={20} className=" animate-spin" />
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="mt-3 p-1 text-center transition duration-300 hover:scale-110 group">
            Already have an account?
            <Link to="/login" className="ml-1 px-2 py-1 group-hover:button-2">
              <span className="text-primary-2 text-[20px] font-semibold group-hover:text-white">
                Login
              </span>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};
export default Register;

// tasks:
// add dialog that contains calendar for user age
