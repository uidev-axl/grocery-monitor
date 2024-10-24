import { ShoppingBasket } from 'lucide-react'
import Signin from './Signin'
import Signup from './Signup'

const Header = () => {
    return (
            <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-10" >
                <h1 className="text-md font-bold text-primary flex items-center">
                    <ShoppingBasket className='mr-2' /> Basket Monitor
                </h1>
                <div className="space-x-2">
                    <Signin />
                    <Signup />
                </div>
            </header>
    )
}

export default Header;