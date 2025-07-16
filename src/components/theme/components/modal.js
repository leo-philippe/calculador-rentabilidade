import { border, color } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const modalStyles = {
  components: {
    Modal: {
      variants: {
        modalContent: (props) => ({
          dialog: {
            background: "#f2f2f2",
            color: "black",
          },
        }),
        modalPeopleContent: (props) => ({
          dialog: {
            background: mode(
              "rgba(0, 0, 0, 0.3)",
              "rgba(255, 255, 255, 1)"
            )(props),
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            color: mode("white", "black")(props),
            minWidth: "90%",
            minHeight: "90vh",
            maxWidth: "1200px",
            maxHeight: "90vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "50px 20px",
          },
          footer: {
            justifyContent: "flex-end",
            padding: "20px",
          },
        }),
        modalPessoasNovoCadastro: (props) => ({
          dialog: {
            background: mode(
              "rgba(0, 0, 0, 0.3)",
              "rgba(255, 255, 255, 1)"
            )(props),
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            color: mode("white", "black")(props),
            minWidth: "90%",
            minHeight: "90vh",
            maxWidth: "1200px",
            maxHeight: "90vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "50px 20px",
          },
          footer: {
            justifyContent: "flex-end",
            padding: "20px",
          },
        }),
      },
    },
    Accordion: {
      variants: {
        accordionContent: (props) => ({
          root: { w: "100%" },
          button: {
            color: mode("white", "black")(props),
            bg: "transparent",
          },
          container: {
            border: mode("1px solid white", "1px solid #A9A9A9")(props),
            borderRadius: "20px",
          },
          icon: { color: mode("white", "black")(props) },
        }),
        accordionContentPeople: (props) => ({
          button: {
            color: mode("white", "black")(props),
            bg: "transparent",
          },
          container: {
            border: mode("1px solid white", "1px solid #A9A9A9")(props),
            borderRadius: "20px",
          },
          icon: { color: mode("white", "black")(props) },
        }),
      },
    },
  },
};
