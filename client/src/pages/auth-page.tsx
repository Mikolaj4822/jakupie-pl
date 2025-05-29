import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/use-language";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertUserSchema } from "@shared/schema";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { t } = useLanguage();

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Login form schema
  const loginSchema = z.object({
    username: z.string().min(1, { message: t("auth.validation.usernameRequired") }),
    password: z.string().min(1, { message: t("auth.validation.passwordRequired") }),
  });

  // Register form schema
  const registerSchema = insertUserSchema.extend({
    confirmPassword: z.string().min(6, { message: t("auth.validation.confirmPasswordRequired") }),
  }).refine(data => data.password === data.confirmPassword, {
    message: t("auth.validation.passwordsDoNotMatch"),
    path: ["confirmPassword"],
  });

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  function onLoginSubmit(data: z.infer<typeof loginSchema>) {
    loginMutation.mutate(data);
  }

  function onRegisterSubmit(data: z.infer<typeof registerSchema>) {
    registerMutation.mutate(data);
  }

  if (user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("auth.pageTitle")} - JaKupie</title>
        <meta name="description" content={t("auth.metaDescription")} />
      </Helmet>

      <div className="container mx-auto py-10 px-4 md:px-0">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Auth Forms */}
          <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t("auth.signIn")}</TabsTrigger>
                <TabsTrigger value="register">{t("auth.register")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("auth.signIn")}</CardTitle>
                    <CardDescription>
                      {t("auth.signInDescription")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("auth.usernameOrEmail")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("auth.enterUsernameOrEmail")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("auth.password")}</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder={t("auth.enterPassword")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t("auth.signingIn")}
                            </>
                          ) : (
                            t("auth.signIn")
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center justify-center">
                    <p className="mt-2 text-sm text-gray-500">
                      {t("auth.noAccount")}{" "}
                      <button
                        onClick={() => setActiveTab("register")}
                        className="text-primary hover:underline font-medium"
                      >
                        {t("auth.createAccount")}
                      </button>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("auth.createAccount")}</CardTitle>
                    <CardDescription>
                      {t("auth.createAccountDescription")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <FormField
                          control={registerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("auth.fullName")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("auth.enterFullName")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("auth.username")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("auth.chooseUsername")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("auth.email")}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder={t("auth.enterEmail")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("auth.password")}</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder={t("auth.createPassword")} {...field} />
                              </FormControl>
                              <FormDescription>
                                {t("auth.passwordRequirements")}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("auth.confirmPassword")}</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder={t("auth.confirmYourPassword")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t("auth.creatingAccount")}
                            </>
                          ) : (
                            t("auth.createAccount")
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center justify-center">
                    <p className="mt-2 text-sm text-gray-500">
                      {t("auth.alreadyHaveAccount")}{" "}
                      <button
                        onClick={() => setActiveTab("login")}
                        className="text-primary hover:underline font-medium"
                      >
                        {t("auth.signIn")}
                      </button>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Hero section */}
          <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-xl p-8 lg:p-12 hidden lg:block">
            <div className="max-w-md">
              <h1 className="text-3xl font-bold mb-4">{t("auth.heroTitle")}</h1>
              <p className="text-xl mb-6 text-indigo-100">
                {t("auth.heroDescription")}
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded mr-3">
                    <i className="fas fa-edit text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t("how.step1.title").replace("1. ", "")}</h3>
                    <p className="text-indigo-100">{t("how.step1.desc")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded mr-3">
                    <i className="fas fa-comments text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t("how.step2.title").replace("2. ", "")}</h3>
                    <p className="text-indigo-100">{t("how.step2.desc")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-2 rounded mr-3">
                    <i className="fas fa-handshake text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t("how.step3.title").replace("3. ", "")}</h3>
                    <p className="text-indigo-100">{t("how.step3.desc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
