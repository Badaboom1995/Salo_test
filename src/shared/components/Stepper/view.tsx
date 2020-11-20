import React from 'react'
import { Wrapper, PrevButton } from './styled'
import Slider from 'react-slick'
import { SettingsType } from './types'
import { ArrowLeftOutlined } from '@ant-design/icons'

type StepperViewProps = {
  settings: SettingsType
  sliderRef: any
  prev: () => void
  next: () => void
  children: any
}

function StepperView({ settings, sliderRef, children, next, prev }: StepperViewProps) {
  return (
    <Wrapper>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
      <PrevButton onClick={prev} type="text" style={{ fontSize: '20px' }}>
        <ArrowLeftOutlined />
      </PrevButton>
    </Wrapper>
  )
}
export default StepperView
