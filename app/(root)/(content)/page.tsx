import React from 'react'
import HomeWallPaperCont from '@/components/home_wallpaper_cont'
import QuickAccessCards from '@/components/quick_access_cards'

const Home = () => {
    return (
        <header className="w-full flex flex-col gap-5 px-[15px] sm:px-[25px] py-5" >
            <HomeWallPaperCont />
            <QuickAccessCards />
        </header>
    )
}

export default Home