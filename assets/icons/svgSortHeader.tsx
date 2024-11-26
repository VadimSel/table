import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgSortHeader = (props: any) => (
  <Svg
    width={10}
    height={10}
    fill="none"
    viewBox="0 0 16 16"
  >
    <Path fill="#000" d="M8 0 2 6v1h12V6L8 0ZM8 16l-6-6V9h12v1l-6 6Z" />
  </Svg>
)
export default SvgSortHeader
