import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgLeftArrow = (props: any) => (
  <Svg
    width={35}
    height={35}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m15 7-5 5 5 5"
    />
  </Svg>
)
export default SvgLeftArrow
