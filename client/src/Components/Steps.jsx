import React from 'react'
import { stepsData } from '../assets/assets'
import { motion } from 'framer-motion'
const Steps = () => {
  // Inline style for hover effect
  const stepStyle = {
    transition: 'transform 0.2s',
  };

  const stepHoverStyle = {
    transform: 'scale(1.02)',
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <motion.div
     initial={{opacity: 0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y:0}}
    viewport={{once: true}}
    className='max-w-4xl mx-auto my-10 flex flex-col items-center'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2 flex items-center justify-center'>How it works</h1>
      <p className=' text-lg text-gray-600 mb-8'>Transform your ideas into stunning images in just a few clicks.</p>
      <div>
        {stepsData.map((step, index) => (
          <div
            key={index}
            className='flex items-center bg-white/20 shadow-lg gap-4 mb-6 p-5 px-8 rounded-lg border border-transparent cursor-pointer'
            style={hoveredIndex === index ? { ...stepStyle, ...stepHoverStyle } : stepStyle}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img width={40} src={step.icon} alt="" />
            <div>
              <h2 className='text-xl font-medium'>{step.title}</h2>
              <h2  className='text-gray-500'>{step.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Steps