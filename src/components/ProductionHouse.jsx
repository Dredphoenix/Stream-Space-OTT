import React from 'react'

// Images
import marvelLogo from './../assets/images/pngwing.com.png'
import natGeoLogo from './../assets/images/NG.png'
import pixarLogo from './../assets/images/pixar.png'
import starWarsLogo from './../assets/images/star wars.png'
import animeLogo from './../assets/images/Anime.png'

// Videos
import marvelVideo from './../assets/videos/marvel.mp4'
import natGeoVideo from './../assets/videos/national-geographic.mp4'
import pixarVideo from './../assets/videos/pixar.mp4'
import starWarsVideo from './../assets/videos/star-wars.mp4'
import animeVideo from './../assets/videos/Anime.mp4'

function ProductionHouse() {
    
    const productionHouseList=[
        {
            id:1,
            image:marvelLogo,
            video:marvelVideo
        },
        {
            id:2,
            image:pixarLogo,
            video:pixarVideo
        },
        {
            id:3,
            image:animeLogo,
            video:animeVideo
        },
        {
            id:4,
            image:starWarsLogo,
            video:starWarsVideo
        },
        {
            id:5,
            image:natGeoLogo,
            video:natGeoVideo
        },
    ]

    return (
        <div className='flex gap-2 md:gap-5 p-15 px-5 md:px-56 '>
            {productionHouseList.map((item)=>(
                <div 
                    key={item.id}
                    className='border-[2px] border-gray-800 rounded-lg hover:scale-110 
                               transition-all duration-300 ease-in-out cursor-pointer 
                               relative shadow-xl shadow-neutral-950 bg-gradient-to-r from-[#3a1c71] via-[#d06add] to-[#bf7bff]

 overflow-hidden
                               w-full max-w-[200px] h-[120px] md:h-[140px] group'
                >
                    <video 
                        src={item.video} 
                        autoPlay 
                        loop 
                        playsInline 
                        muted
                        className='absolute inset-0 w-full h-full object-cover z-0
                                   opacity-0 group-hover:opacity-80 transition-opacity 
                                   duration-300'
                    />
                    
                    <img 
                        src={item.image} 
                        className='w-full h-full object-contain z-[1] relative p-2' 
                    />                           
                </div>
            ))}
        </div>
    )
}

export default ProductionHouse