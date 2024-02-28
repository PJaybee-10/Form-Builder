import { Steps } from "antd";
import { renderStyle } from "../RenderUtils";

export default function RenderSteps({ t, element }) {
  let { options, name } = element;
  let { style } = options ?? {};

  return (
    <Steps style={renderStyle(options?.style)}>
      <Steps status="finish" title="مرحله اول" />
      <Steps status="finish" title="مرحله دوم" />
      <Steps status="process" title="مرحله آخر" />
    </Steps>
  );
}