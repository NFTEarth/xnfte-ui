import { Card, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { NFTE_CONTRACT_ADDRESS } from "../constants/addresses";
 
export default function NFTEToken() {
    
    const address = useAddress();
    const { contract: NFTEToken, isLoading: loadingNFTEToken } = useContract(NFTE_CONTRACT_ADDRESS);
    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(NFTEToken, address);
    
    return (
        <Card p={5}>
            <Stack>
                <Heading>Stake NFTE</Heading>
                <Skeleton h={4} w={"50%"} isLoaded={!loadingNFTEToken && !loadingTokenBalance}>
                    <Text fontSize={"large"} fontWeight={"bold"}>${tokenBalance?.symbol}</Text>
                </Skeleton>
                <Skeleton h={4} w={"100%"} isLoaded={!loadingNFTEToken && !loadingTokenBalance}>
                    <Text>{tokenBalance?.displayValue}</Text>
                </Skeleton>
            </Stack>
        </Card>
    )
}