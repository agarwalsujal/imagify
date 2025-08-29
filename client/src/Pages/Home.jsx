import React from 'react'
import Header from '../Components/Header'
import Steps from '../Components/Steps'
import Description from '../Components/Description'
import Testimonial from '../Components/Testimonial'
import GenerateBtn from '../Components/GenerateBtn'

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Steps></Steps>
      <Description></Description>
      <Testimonial>  </Testimonial>
      <GenerateBtn></GenerateBtn>
    </div>
  )
}

export default Home