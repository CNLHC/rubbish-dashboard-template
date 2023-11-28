import React from "react"
import RouterButton from "../components/router-button"
import { IconLinkPlus } from "@tabler/icons-react"

const MainPage = () => {
  return (
    <div className=" h-[100vh] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-4">
        Hello World
        <br />
        <RouterButton
          variant="gradient"
          goto={"/admin"}
          rightSection={<IconLinkPlus />}
        />
      </div>
    </div>
  )
}

export default MainPage
