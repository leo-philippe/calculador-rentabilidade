import { background, color } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const inputStyles = {
  components: {
    Input: {
      baseStyle: {
        field: {
          fontWeight: 400,
          borderRadius: "8px",
        },
      },

      variants: {
        main: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid",
            color: mode("secondaryGray.900", "white")(props),
            borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
            borderRadius: "16px",
            fontSize: "sm",
            p: "20px",
            _placeholder: { color: "secondaryGray.400" },
          },
        }),
        inputText: (props) => ({
          field: {
            fontWeight: "300",
            color: "black",
            border: "1px solid gray.500",
            bg: "white",
            borderRadius: "16px",
            _placeholder: {
              fontWeight: "200",
              color: "#8b97a9",
            },
          },
        }),
        inputTextDatatablePeople: (props) => ({
          field: {
            fontWeight: "300",
            color: "black",
            border: mode(
              "1px solid secondaryGray.900",
              "1px solid #F5F5F5"
            )(props),
            bg: "#F5F5F5",
            borderRadius: "16px",
            _placeholder: {
              fontWeight: "200",
            },
          },
        }),
        auth: (props) => ({
          field: {
            fontWeight: "500",
            color: mode("gray.100", "gray.500")(props),
            bg: mode("transparent", "transparent")(props),
            border: "1px solid",
            borderColor: mode(
              "secondaryGray.100",
              "rgba(135, 140, 189, 0.3)"
            )(props),
            borderRadius: "16px",
            _placeholder: {
              color: mode("gray.100", "gray.500")(props),
              fontWeight: "400",
            },
          },
        }),
        authSecondary: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",
            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
      },
    },
    NumberInput: {
      baseStyle: {
        field: {
          fontWeight: 400,
        },
      },

      variants: {
        main: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        auth: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        authSecondary: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        inputText: (props) => ({
          field: {
            fontWeight: "300",
            color: "black",
            border: "1px solid gray.500",
            bg: "white",
            borderRadius: "16px",
            _placeholder: {
              fontWeight: "200",
            },
          },
        }),
        inputTextDatatablePeople: (props) => ({
          field: {
            fontWeight: "300",
            color: "black",
            border: "1px solid gray.500",
            bg: "#F5F5F5",
            borderRadius: "16px",
            _placeholder: {
              fontWeight: "200",
            },
          },
        }),
      },
    },
    Select: {
      baseStyle: {
        field: {
          width: "100%",
          fontWeight: 400,
        },
        icon: {
          color: "white",
          padding: 0,
          right: "0px",
          width: "30px",
          borderRadius: "5px",
        },
      },

      variants: {
        main: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "1px solid",
            color: "secondaryGray.600",
            borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
          icon: {
            color: "secondaryGray.600",
          },
        }),
        brand: (props) => ({
          field: {
            bg: "transparent",
            fontWeight: "500",
            "> option": {
              background: "transparent",
              color: "black",
            },
            border: "1px solid ",
            color: mode("gray.100", "gray.500")(props),
            borderColor: mode("gray.200", "gray.400")(props),
            borderRadius: "16px",
          },
          icon: {
            color: mode("black", "white")(props),
            borderRadius: "0px 15px 15px 0px",
            w: "10%",
            background: mode("#EDECEC", "#212121")(props),
            transition: "color 0.3s",
          },
        }),
        mini: (props) => ({
          field: {
            bg: mode("transparent", "navy.800")(props),
            border: "0px solid transparent",
            fontSize: "0px",
            p: "10px",
            _placeholder: { color: "secondaryGray.600" },
          },
          icon: {
            color: "secondaryGray.600",
          },
        }),
        subtle: (props) => ({
          box: {
            width: "unset",
          },
          field: {
            bg: "transparent",
            border: "0px solid",
            color: "secondaryGray.600",
            borderColor: "transparent",
            width: "max-content",
            _placeholder: { color: "secondaryGray.600" },
          },
          icon: {
            color: "secondaryGray.600",
          },
        }),
        transparent: (props) => ({
          field: {
            bg: "transparent",
            border: "0px solid",
            width: "min-content",
            color: mode("secondaryGray.600", "secondaryGray.600")(props),
            borderColor: "transparent",
            padding: "0px",
            paddingLeft: "8px",
            paddingRight: "20px",
            fontWeight: "700",
            fontSize: "14px",
            _placeholder: { color: "secondaryGray.600" },
          },
          icon: {
            transform: "none !important",
            position: "unset !important",
            width: "unset",
            color: "secondaryGray.600",
            right: "0px",
          },
        }),
        auth: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        authSecondary: (props) => ({
          field: {
            bg: "transparent",
            border: "1px solid",

            borderColor: "secondaryGray.100",
            borderRadius: "16px",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
        search: (props) => ({
          field: {
            border: "none",
            py: "11px",
            borderRadius: "inherit",
            _placeholder: { color: "secondaryGray.600" },
          },
        }),
      },
    },
    // PinInputField: {
    //   variants: {
    //     main: (props) => ({
    //       field: {
    //         bg: "red !important",
    //         border: "1px solid",
    //         color: mode("secondaryGray.900", "white")(props),
    //         borderColor: mode("secondaryGray.100", "whiteAlpha.100")(props),
    //         borderRadius: "16px",
    //         _placeholder: { color: "secondaryGray.600" },
    //       },
    //     }),
    //   },
    // },
  },
};
