import { border } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const formLabelStyles = {
  components: {
    FormLabel: {
      baseStyle: {
        field: {
          color: "red",
        },
      },
      variants: {
        main: (props) => ({
          color: mode("white", "black")(props),
        }),
        brand: (props) => ({
          color: "black",
        }),
      },
    },
  },
};
