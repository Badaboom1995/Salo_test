import React from 'react'
import { RadioGroupStyled } from './styled'

export type RadioGroupProps = {
  color: string
}

function RadioGroup(props: RadioGroupProps) {
  return (
    <RadioGroupStyled
      optionType="button"
      buttonStyle="solid"
      options={[
        { label: '7 days', value: '7' },
        { label: '14 days', value: '14' },
        { label: '21 days', value: '21' },
        { label: '30 days', value: '30' },
      ]}
      color={props.color}
    />
  )
}
export default RadioGroup
