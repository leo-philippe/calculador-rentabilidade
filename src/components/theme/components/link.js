import { mode } from "@chakra-ui/theme-tools";

export const linkStyles = {
    components: {
      Link: {
          baseStyle: {
            textDecoration: "none",
              boxShadow: "none",
            _focus: {
                boxShadow: "none"
            },
            _active: {
                boxShadow: "none"
            },
            _hover: {
              textDecoration: "none",
              border: "none"
            }

          },
          _hover: {
            textDecoration: "none",
            border: "none"
          },
          variants:{
            dark:(props)=>({
              color: mode("gray.300", "gray.500")(props)
            })
          }
      },
    },
  };