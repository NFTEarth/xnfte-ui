import { Card, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { XNFTE_CONTRACT_ADDRESS, } from "../constants/addresses";

export default function StakeToken() {

    const address = useAddress();
    const { contract: xNFTETokenContract, isLoading: loadingxNFTEToken } = useContract(XNFTE_CONTRACT_ADDRESS);
    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(xNFTETokenContract, address);
    
    return (
        <Card p={5}>
            <Stack>
                <Heading>xNFTE Balance</Heading>
                <Skeleton h={4} w={"50%"} isLoaded={!loadingxNFTEToken && !loadingTokenBalance}>
                    <Text fontSize={"large"} fontWeight={"bold"}>${tokenBalance?.symbol}</Text>
                </Skeleton>
            </Stack>
        </Card>
    )
}
