import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from "@chakra-ui/theme-tools";
import "../global.css";


const breakpoints = createBreakpoints({
  sm: "200px",
  md: "376px",
  lg: "750px",
  xl: "1000px",
});

const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      "html, body": {
        font: "16px museo-sans-300",
        color: "#586174",
        lineHeight: "1.75",
      },
      "input, select": {
        color: "#495057",
        font: "16px museo-sans-500",
      }
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;