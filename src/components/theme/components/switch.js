import { border, color, Tooltip } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { textStyles } from "./text";
export const switchStyles = {
  components: {
    Switch: {
      baseStyle: {
        thumb: {
          fontWeight: 400,
          borderRadius: "50%",
          w: "16px",
          h: "16px",
          _checked: { transform: "translate(20px, 0px)" },
        },
        track: {
          display: "flex",
          alignItems: "center",
          boxSizing: "border-box",
          w: "40px",
          h: "20px",
          p: "2px",
          ps: "2px",
          _focus: {
            boxShadow: "none",
          },
        },
      },

      variants: {
        main: (props) => ({
          track: {
            bg: mode("gray.300", "navy.700")(props),
          },
        }),
      },
    },
    Tooltip: {
      variants: {
        main: (props) => ({
          borderRadius: "10px",
          bg: "#f2f2f2",
          color: "black",
          m: "10px",
          p: "10px",
          textAlign: "justify",
          _before: {
            bg: "#f2f2f2", // Mesma cor de fundo da tooltip para a seta
          },
          hasArrow: true,
        }),
      },
    },
  },
};
