import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer" 

const Signin = () => {
    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    asdf
                    <Button variant="outline" size="sm">Login</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Move Goal</DrawerTitle>
                            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                        </DrawerHeader>

                        Test drawer

                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Signin;