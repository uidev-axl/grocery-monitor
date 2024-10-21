import { ShoppingBasket } from 'lucide-react'
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
import Signin from './Signin'
import Signup from './Signup'

const Header = () => {
    return (
        <>
            {/* Sticky Header */ }
            < header className = "sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-10" >
                <h1 className="text-md font-bold text-primary flex items-center">
                    <ShoppingBasket className='mr-2' /> Basket Monitor
                </h1>
                <div className="space-x-2">
                    <Signin />
                    <Signup />
                </div>
            </header>

            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Open Drawer</Button>
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

export default Header;