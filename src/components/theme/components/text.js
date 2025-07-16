import { Heading, Indicator, Tab, color } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const textStyles = {
  components: {
    Text: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },
      variants: {
        main: (props) => ({
          color: mode("white", "black")(props),
        }),
        dark: (props) => ({
          color: mode("white", "black")(props),
        }),
        inputText: (props) => ({
          color: mode("black", "black")(props),
          fontSize: "14px",
        }),
        inputResultText: (props) => ({
          color: mode("black", "black")(props),
          fontSize: "20px",
        }),
        accordionText: (props) => ({
          color: mode("white", "white")(props),
          textAlign: "left",
          flex: "1",
        }),
      },
    },
    Heading: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },
      variants: {
        main: (props) => ({
          color: mode("white", "black")(props),
          fontWeight: "bold",
        }),
        dark: (props) => ({
          color: mode("white", "black")(props),
        }),
        headingFont: (props) => ({
          fontFamily: "Bricolage Grotesque",
          color: mode("white", "black")(props),
        }),
      },
    },
    Tabs: {
      variants: {
        main: (props) => ({
          tab: {
            color: mode("white", "black")(props),
            _selected: {
              color: mode("gray.400", "gray.600")(props),
              fontWeight: "700",
            },
          },
        }),
      },
    },
  },
};
