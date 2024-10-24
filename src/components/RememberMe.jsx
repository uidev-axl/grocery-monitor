import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const RememberMe = ({ htmlFor }) => {
    return (
        <div className="flex items-center">
            <Checkbox id={htmlFor} className="mr-2 border-input" />
            <Label htmlFor={htmlFor} className="cursor-pointer">Remember me</Label>
        </div>
    )
}

export default RememberMe;