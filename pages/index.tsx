import type { NextPage } from "next";
import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import NFTEToken from "../components/NFTEToken";
import XNFTEToken from "../components/XNFTEToken";
import Stake from "../components/Stake";

const Home: NextPage = () => {
  const address = useAddress();
  if(!address) {
    return (
      <Container maxW={"1200px"}>
        <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
          <Heading>Please Connect Your Wallet</Heading>
        </Flex>
      </Container>
      
    <Container maxW={"1200px"}>
        <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
    )
  }
  
  return (
    <Container maxW={"1200px"}>
      <SimpleGrid columns={2} spacing={4} mt={10}>
        <NFTEToken />
        <XNFTEToken />
      </SimpleGrid>
      <Stake />
    </Container>
  );
};
export default Home;
