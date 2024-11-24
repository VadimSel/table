import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const SvgComponent = (props: any) => (
  <Svg
  width={25}
  height={25}
    fill="none"
    viewBox="0 0 24 24"
  >
    <G stroke="#000" strokeLinecap="round" strokeWidth={1.5}>
      <Path d="M4 16h9M6 11h7M8 6h5" />
      <Path strokeLinejoin="round" d="M17 4v16l3-4" />
    </G>
  </Svg>
)
export default SvgComponent
