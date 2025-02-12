import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

const CustomSideBarTrigger = () => {
  const {toggleSidebar} = useSidebar()

  return (
    <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
  )
}

export default CustomSideBarTrigger