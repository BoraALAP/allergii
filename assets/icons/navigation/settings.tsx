import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

export const SettingsIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <G
      fill={props.color}
      fillRule="evenodd"
      clipPath="url(#a)"
      clipRule="evenodd"
    >
      <Path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-4 2a4 4 0 1 1 8 0 4 4 0 0 1-8 0" />
      <Path d="M12 2a1 1 0 0 0-1 1v.174a2.65 2.65 0 0 1-1.606 2.425 1 1 0 0 1-.264.073 2.65 2.65 0 0 1-2.73-.607l-.007-.008-.06-.06a1.003 1.003 0 0 0-1.415 0h-.001a1 1 0 0 0 0 1.415l.068.069a2.65 2.65 0 0 1 .542 2.894 2.65 2.65 0 0 1-2.414 1.705H3a1 1 0 0 0 0 2h.174a2.65 2.65 0 0 1 2.423 1.601 2.65 2.65 0 0 1-.532 2.918l-.008.008-.06.06a1 1 0 0 0-.217 1.09 1 1 0 0 0 .217.325v.001a1 1 0 0 0 1.415 0l.069-.068a2.65 2.65 0 0 1 2.894-.543 2.65 2.65 0 0 1 1.705 2.415V21a1 1 0 0 0 2 0v-.174a2.65 2.65 0 0 1 1.601-2.423 2.65 2.65 0 0 1 2.918.532l.008.008.06.06a1 1 0 0 0 1.415 0h.001a1 1 0 0 0 0-1.416l-.068-.068a2.65 2.65 0 0 1-.532-2.918A2.65 2.65 0 0 1 20.906 13H21a1 1 0 0 0 0-2h-.174a2.65 2.65 0 0 1-2.425-1.606 1 1 0 0 1-.073-.264 2.65 2.65 0 0 1 .607-2.73l.008-.007.06-.06a1 1 0 0 0 0-1.415v-.001a1 1 0 0 0-1.416 0l-.068.068a2.65 2.65 0 0 1-2.918.532A2.65 2.65 0 0 1 13 3.094V3a1 1 0 0 0-1-1M9.879.879A3 3 0 0 1 15 3v.087a.65.65 0 0 0 .394.594l.01.004a.65.65 0 0 0 .714-.127l.055-.055a3 3 0 0 1 4.895 3.27c-.151.365-.372.696-.65.974l-.056.055a.65.65 0 0 0-.127.714q.043.096.064.2a.65.65 0 0 0 .534.284H21a3 3 0 1 1 0 6h-.087a.65.65 0 0 0-.594.394l-.004.01a.65.65 0 0 0 .127.714l.055.055a3 3 0 0 1 0 4.245l-.707-.708.707.707a3 3 0 0 1-4.244 0l-.055-.055a.65.65 0 0 0-.714-.127l-.01.004a.65.65 0 0 0-.394.593V21a3 3 0 0 1-6 0v-.076a.65.65 0 0 0-.425-.585l-.059-.024a.65.65 0 0 0-.714.127l-.054.055a3.002 3.002 0 1 1-4.245-4.244l.055-.055a.65.65 0 0 0 .127-.714l-.004-.01a.65.65 0 0 0-.594-.394H3a3 3 0 0 1 0-6h.076a.65.65 0 0 0 .585-.425l.024-.059a.65.65 0 0 0-.127-.714l-.055-.054a3 3 0 1 1 4.244-4.245l.055.055a.65.65 0 0 0 .714.127 1 1 0 0 1 .2-.064A.65.65 0 0 0 9 3.167V3A3 3 0 0 1 9.879.879" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);