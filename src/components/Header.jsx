import { ShoppingBasket } from 'lucide-react'
import Signin from './Signin'
import Signup from './Signup'
import { useState } from 'react'

const Header = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const openLogin = () => {
        console.log('opening login');
        setIsLoginOpen((prev) => !prev);
        setIsSignupOpen(() => false);
    }

    const openSignup = () => {
        console.log('opening signup');
        setIsSignupOpen((prev) => !prev);
        setIsLoginOpen(() => false);
    }

    return (
        <>
            <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center z-10" >
                <h1 className="text-md font-bold text-primary flex items-center">
                    <ShoppingBasket className='mr-2' /> Basket Monitor
                </h1>
                <div className="space-x-2">
                    <Signin 
                        isOpen={isLoginOpen} 
                        setIsOpen={setIsLoginOpen}
                        openSignup={openSignup}
                    />
                    <Signup 
                        isOpen={isSignupOpen} 
                        setIsOpen={setIsSignupOpen}
                        openLogin={openLogin}
                    />
                </div>
            </header>
        </>
    )
}

export default Header;