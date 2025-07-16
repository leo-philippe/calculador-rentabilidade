import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./additions/card/card";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { inputStyles } from "./components/input";
import { progressStyles } from "./components/progress";
import { sliderStyles } from "./components/slider";
import { textareaStyles } from "./components/textarea";
import { textStyles } from "./components/text";
import { switchStyles } from "./components/switch";
import { linkStyles } from "./components/link";
import { formLabelStyles } from "./components/formLabel";
import { globalStyles } from "./styles";
import { modalStyles } from "./components/modal";

export default extendTheme(
  globalStyles,
  badgeStyles,
  buttonStyles,
  linkStyles,
  progressStyles,
  sliderStyles,
  inputStyles,
  textareaStyles,
  switchStyles,
  CardComponent,
  textStyles,
  formLabelStyles,
  modalStyles
);

// import { createSystem, defaultConfig } from "@chakra-ui/react";

// const system = createSystem(defaultConfig, {
//   theme: {
//     tokens: {
//       colors: {
//         brand: {
//           0: { value: "#F5D35E" },
//           100: { value: "#E9E3FF" },
//           200: { value: "#422AFB" },
//           300: { value: "#422AFB" },
//           400: { value: "#7551FF" },
//           500: { value: "#422AFB" },
//           600: { value: "#3311DB" },
//           700: { value: "#02044A" },
//           800: { value: "#190793" },
//           900: { value: "#11047A" },
//         },
//         gray: {
//           100: { value: "#FAFCFE" },
//         },
//         // adicione o restante das cores aqui com `{ value: ... }`
//       },
//       fonts: {
//         body: { value: "Bricolage Grotesque" },
//         heading: { value: "Bricolage Grotesque" },
//       },
//     },
//     semanticTokens: {
//       colors: {
//         bg: {
//           default: { value: "#FAFCFE" },
//           _dark: { value: "#0b1437" },
//         },
//       },
//     },
//     styles: {
//       global: {
//         body: {
//           overflowX: "hidden",
//           fontFamily: "Bricolage Grotesque",
//           bg: { value: "#FAFCFE" },
//         },
//         input: {
//           color: { value: "#1B254B" },
//         },
//       },
//     },
//   },
// });

// export default system;
