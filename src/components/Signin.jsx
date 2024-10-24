import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer" 
import { SquareUserRound, ChevronsDown } from "lucide-react"
import SocialAuths from "./SocialAuths"
import RememberMe from "./RememberMe"

const Signin = () => {
    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline" size="sm">Login</Button>
                </DrawerTrigger>

                <DrawerContent>
                    <div className="mx-auto w-full max-w-[90%] px-6 my-8 h-full flex flex-col items-center justify-center">
                        <DrawerHeader>
                            <DrawerTitle className="flex items-center justify-center">
                                <SquareUserRound className="mr-2" /> Login
                            </DrawerTitle>
                        </DrawerHeader>
                        
                        <div className="py-4 text-center w-full max-w-sm mx-auto">
                            
                            <form onSubmit={() => e.target.prevent()} className="text-left grid gap-y-2">
                                <div className="grid gap-y-1">
                                    <div className="">
                                        <Label htmlFor="email" className="inline-block mb-2">Email</Label>
                                        <Input type="email" placeholder="Email" required />
                                    </div>
                                    <div className="">
                                        <Label htmlFor="password" className="inline-block mb-2">Password</Label>
                                        <Input type="password" placeholder="Password" required />
                                        <div className="text-right">
                                            <a href="#" className="inline-block mt-2 ml-auto text-sm cursor-pointer text-blue-500 focus:text-blue-900 transition-colors">Forgot your password?</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-y-3">
                                    {/* Remember */}
                                    <div className=""><RememberMe htmlFor="remember" /></div>

                                    {/* Submit */}
                                    <Button type="submit" className="w-full">Log In</Button>
                                    
                                    {/* Signup / Register */}
                                    <div className="text-sm text-center text-muted-foreground">
                                        Don't have an account yet? <a href="#" className="cursor-pointer text-blue-500 focus:text-blue-900 transition-colors">Register here.</a>
                                    </div>
                                </div>
                            </form>

                            <hr className="my-4" />

                            {/* Social auth */}
                            <div className="w-full grid gap-y-4 text-center">
                                <div className="text-sm text-muted-foreground">Or login with</div>
                                <div className="grid gap-y-2"><SocialAuths /></div>
                                
                                {/* Remember */}
                                <div className="flex justify-center"><RememberMe htmlFor="remember-social" /></div>
                            </div>
                        </div>
                    </div>
                    
                    <DrawerFooter className="inset-x-0 w-32 mx-auto !mt-0 mb-4">
                        <DrawerClose asChild>
                            <div className="flex flex-col items-center justify-center cursor-pointer">
                                <small className="uppercase text-xs text-muted-foreground">Close</small>
                                <ChevronsDown className="motion-safe:animate-bounce mt-2" />
                            </div>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Signin;