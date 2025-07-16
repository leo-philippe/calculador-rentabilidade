import { mode } from "@chakra-ui/theme-tools";
export const buttonStyles = {
  components: {
    Button: {
      baseStyle: {
        borderRadius: "16px",
        fontWeight: 400,
        boxShadow: "45px 76px 113px 7px rgba(112, 144, 176, 0.08)",
        transition: ".25s all ease",
        boxSizing: "border-box",
        _focus: {
          boxShadow: "none",
        },
        _active: {
          boxShadow: "none",
        },
      },
      variants: {
        outline: () => ({
          borderRadius: "16px",
        }),
        brand: (props) => ({
          bg: mode("#EDECEC", "#212121")(props),
          color: mode("black", "white")(props),
          _focus: {
            bg: "#212121",
            color: "white",
          },
          _active: {
            bg: "#212121",
            color: "white",
          },
          _hover: {
            bg: mode("#F5D35E", "#F5D35E")(props),
            color: "black",
          },
        }),
        loginpage: (props) => ({
          bg: mode("transparent", "transparent")(props),
          color: mode("white", "#212121")(props),
          border: mode("1px #EDECEC solid", "1px #212121 solid")(props),
          _focus: {
            bg: "#212121",
            color: "white",
          },
          _active: {
            bg: "#212121",
            color: "white",
          },
          _hover: {
            bg: mode("#F5D35E", "#F5D35E")(props),
            color: "black",
          },
        }),
        darkBrand: (props) => ({
          bg: mode("brand.0", "brand.400")(props),
          color: "white",
          _focus: {
            bg: mode("brand.900", "brand.400")(props),
          },
          _active: {
            bg: mode("brand.900", "brand.400")(props),
          },
          _hover: {
            bg: mode("brand.800", "brand.400")(props),
          },
        }),
        lightBrand: (props) => ({
          bg: mode("#F2EFFF", "whiteAlpha.100")(props),
          color: mode("brand.500", "white")(props),
          _focus: {
            bg: mode("#F2EFFF", "whiteAlpha.100")(props),
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
          },
        }),
        light: (props) => ({
          bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _active: {
            bg: mode("secondaryGray.300", "whiteAlpha.100")(props),
          },
          _hover: {
            bg: mode("secondaryGray.400", "whiteAlpha.200")(props),
          },
        }),
        action: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("secondaryGray.300", "brand.400")(props),
          color: mode("brand.500", "white")(props),
          _focus: {
            bg: mode("secondaryGray.300", "brand.400")(props),
          },
          _active: { bg: mode("secondaryGray.300", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.200", "brand.400")(props),
          },
        }),
        link: (props) => ({
          fontWeight: "500",
          color: mode("#EDECEC", "#212121")(props),
        }),
        setup: (props) => ({
          fontWeight: "500",
          borderRadius: "50px",
          bg: mode("transparent", "brand.400")(props),
          border: mode("1px solid", "0px solid")(props),
          borderColor: mode("secondaryGray.400", "transparent")(props),
          color: mode("secondaryGray.900", "white")(props),
          _focus: {
            bg: mode("transparent", "brand.400")(props),
          },
          _active: { bg: mode("transparent", "brand.400")(props) },
          _hover: {
            bg: mode("secondaryGray.100", "brand.400")(props),
          },
        }),
        password: (props) => ({
          background: "transparent",
          color: mode("gray.100", "gray.500")(props),
        }),
        filters: (props) => ({
          w: "150px",
          h: "50px",
          borderRadius: "30px",
          fontFamily: "Bricolage Grotesque",
        }),
        datailButton: (props) => ({
          bg: mode("#212121", "#EDECEC")(props),
          color: mode("white", "black")(props),
          _focus: {
            bg: "#212121",
            color: "white",
          },
          _active: {
            bg: "#212121",
            color: "white",
          },
          _hover: {
            bg: mode("#F5D35E", "#F5D35E")(props),
            color: "black",
          },
        }),
      },
    },
  },
};
