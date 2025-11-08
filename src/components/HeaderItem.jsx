import React from 'react'


function HeaderItem({name,Icon}) {
  return (
   <div className="group relative flex items-center gap-2 cursor-pointer p-2 text-[15px] font-semibold whitespace-nowrap">
      <Icon className="text-[17px]" />
      {/* <h2 className="mt-1 hidden md:block relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
        {name}
      </h2> */}
      <h2 className={`mt-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full ${name === '' ? 'hidden md:block' : 'block'}`}>
  {name}
</h2>

    </div>


  );
}

export default HeaderItem