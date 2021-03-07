import Head from "next/head";
import { Box } from "@chakra-ui/react"
import { MortgageCalculator } from "../src/components/MortgageCalculator";


export default function Home() {
  return (
    <Box py={{ sm: "0px", md: "50px" }} px={{ sm: "15px", md: "1em", lg: "10em", xl: "15em" }}>
      <Head>
        <title>Tally Mortgage Calculator</title>
        <link rel="icon" href="/favicon-16x16.png" />
        <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
        <link
            rel="preload"
            href="/museo-sans-300.bdb59b80.otf"
            as="font"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/museo-sans-500.62c01351.otf"
            as="font"
            crossOrigin=""
          />
      </Head>
      <MortgageCalculator />
    </Box>
  );
}
