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
        <iframe
    src="https://ipfs-2.thirdwebcdn.com/ipfs/QmSmkcH3AzLPTcub173t7bCtTzQV3dRb4gwG3uU84J6YJq?contract=0x8778B7FD7e2480C6F9Ad1075Bd848B7Ce1b9d90C&chain=%7B%22name%22%3A%22Arbitrum+One%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Farbitrum.rpc.thirdweb.com%2F5a9bc94b87f7cbbbfbbc234bf1e07f0adf5f3cf3012c9f26f9fc9820d64df93a%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22arb1%22%2C%22chainId%22%3A42161%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22arbitrum%22%7D&theme=dark&primaryColor=green"
    width="600px"
    height="600px"
    style="max-width:100%;"
    frameborder="0"
    ></iframe>
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
