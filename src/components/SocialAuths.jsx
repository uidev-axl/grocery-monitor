import { Button } from "@/components/ui/button"
import Google from "./icons/google";
import Facebook from "./icons/facebook";
import Twitter from "./icons/twitter";

const SocialAuths = () => {
    // TODO: Authentication
    function handleSocialLogin(name) {}

    return <>
        <Button className="w-full " variant="outline">
            <Google className="w-4 h-4 mr-2" /> Google
        </Button>
        <Button className="w-full" variant="outline">
            <Facebook className="w-4 h-4 mr-2" /> Facebook
        </Button>
        {/* <Button className="w-full" variant="outline">
            <Twitter className="w-4 h-4 mr-2" /> Twitter
        </Button> */}
    </>
}

export default SocialAuths;