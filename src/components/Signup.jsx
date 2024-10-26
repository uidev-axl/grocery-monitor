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

const Signup = ({ isOpen, setIsOpen, openLogin }) => {
    return (
        <>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                    <Button size="sm">Signup</Button>
                </DrawerTrigger>

                <DrawerContent>
                    <div className="mx-auto w-full max-w-[90%] px-6 my-4 h-full flex flex-col items-center justify-center">
                        <DrawerHeader>
                            <DrawerTitle className="flex items-center justify-center">
                                <SquareUserRound className="mr-2" /> Signup
                            </DrawerTitle>
                        </DrawerHeader>
                        
                        <div className="py-4 text-center w-full max-w-sm mx-auto">
                            
                            <form onSubmit={() => e.target.prevent()} className="text-left grid gap-y-2">
                                <div className="grid gap-y-1">
                                    <div className="">
                                        <Label htmlFor="username" className="inline-block mb-2">Username</Label>
                                        <Input type="username" placeholder="Username" required />
                                    </div>
                                    <div className="">
                                        <Label htmlFor="email" className="inline-block mb-2">Email</Label>
                                        <Input type="email" placeholder="Email" required />
                                    </div>
                                    <div className="">
                                        <Label htmlFor="password" className="inline-block mb-2">Password</Label>
                                        <Input type="password" placeholder="Password" required />
                                    </div>
                                    <div className="">
                                        <Label htmlFor="confirm-password" className="inline-block mb-2">Confirm Password</Label>
                                        <Input type="password" placeholder="Confirm Password" required />
                                    </div>
                                    <Button type="submit" className="my-2 mt-3 w-full">Signup</Button>
                                </div>
                            </form>

                            <hr className="my-2" />

                            {/* Social auth */}
                            <div className="w-full grid gap-y-2 text-center">
                                <div className="text-sm text-muted-foreground">Or continue with</div>
                                <div className="grid gap-y-2"><SocialAuths /></div>
                            </div>

                            {/* Login */}
                            <div className="mt-3 text-sm text-center text-muted-foreground">
                                Already have an account? <a href="#" onClick={openLogin} className="cursor-pointer text-blue-500 focus:text-blue-900 transition-colors">Login.</a>
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

export default Signup;