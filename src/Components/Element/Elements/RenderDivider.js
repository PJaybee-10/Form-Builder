import { Divider } from "antd";
import { renderStyle } from "../RenderUtils";

export default function RenderDivider({ t, element }) {
  let { options, name } = element;
  let { style } = options ?? {};

  return <Divider style={renderStyle(style)} />;
}