import { Box, Card, Flex, Heading, Input, SimpleGrid, Skeleton, Stack, Text, useToast } from "@chakra-ui/react";
import { Web3Button, useAddress, useContract, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import { XNFTE_CONTRACT_ADDRESS, NFTE_CONTRACT_ADDRESS, EARTHLINGS_CONTRACT_ADDRESS, FEE_DISTRIBUTOR_ADDRESS } from "../constants/addresses";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";


export default function Stake() {
    const address = useAddress();
    const { 
        contract: NFTEToken
    } = useContract(NFTE_CONTRACT_ADDRESS, "token");
    const { 
        contract: xNFTETokenContract
    } = useContract(XNFTE_CONTRACT_ADDRESS, "token");
    const { 
        contract: stakeContract
    } = useContract(XNFTE_CONTRACT_ADDRESS, "custom");
    const { 
        data: stakeInfo, 
        refetch: refetchStakeInfo, 
        isLoading: loadingStakeInfo 
    } = useContractRead(
            stakeContract,
            "getStakeInfo",
            [address]
        );
    const {  
        data: NFTETokenBalance,
        isLoading: loadingNFTETokenBalance 
    } = useTokenBalance(
            NFTEToken, 
            address
        );
    const {  
        data: xNFTETokenBalance, 
        isLoading: loadingxNFTETokenBalance 
    } = useTokenBalance(
            xNFTETokenContract, 
            address
        );
        
    useEffect(() => {
        setInterval(() => {
            refetchStakeInfo();
        }, 10000);
    }, []);
    const [stakeAmount, setStakeAmount] = useState<string>("0");
    const [unstakeAmount, setUnstakeAmount] = useState<string>("0");
    function resetValue() {
        setStakeAmount("0");
        setUnstakeAmount("0");
    }
    const toast = useToast();
    
    return (
        <Card p={5} mt={10}>
            <Heading>Earn $ETH rewards</Heading>
            <SimpleGrid columns={2}>
                <Card p={5} m={5}>
                    <Box textAlign={"center"} mb={5}>
                        <Text fontSize={"xl"} fontWeight={"bold"}>Stake NFTE</Text>
                        <Skeleton isLoaded={!loadingStakeInfo && !loadingNFTETokenBalance}>
                            {stakeInfo && stakeInfo[0] ? (
                                <Text>{ethers.utils.formatEther(stakeInfo[0])}{" $" + NFTETokenBalance?.symbol}</Text>
                            ) : (
                                <Text>0</Text>
                            )}
                        </Skeleton>
                    </Box>
                    <SimpleGrid columns={2} spacing={4}>
                        <Stack spacing={4}>
                            <Input
                                type="number"
                                max={xNFTETokenBalance?.displayValue}
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                            />
                            <Web3Button
                                contractAddress={FEE_DISTRIBUTOR_ADDRESS}
                                action={async (contract) => {
                                await xNFTETokenContract?.setAllowance(
                                        FEE_DISTRIBUTOR_ADDRESS,
                                        stakeAmount
                                );
                                await contract.call(
                                    "stake",
                                    [ethers.utils.parseEther(stakeAmount)]
                                );
                                resetValue();
                                }}
                                onSuccess={() => toast({
                                    title: "Stake Successful",
                                    status: "success",
                                    duration: 5000,
                                    isClosable: true,
                                })}
                            >Stake</Web3Button>
                        </Stack>
                        <Stack spacing={4}>
                            <Input
                                type="number"
                                value={unstakeAmount}
                                onChange={(e) => setUnstakeAmount(e.target.value)}
                            />
                            <Web3Button
                            contractAddress={FEE_DISTRIBUTOR_ADDRESS}
                            action={async (contract) => {
                                await contract.call(
                                    "withdraw",
                                    [ethers.utils.parseEther(unstakeAmount)]
                                );
                            }}
                            onSuccess={() => toast({
                                title: "Unstake Successful",
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                            })}
                        >Unstake</Web3Button>
                        </Stack>
                    </SimpleGrid>
                </Card>
                <Card p={5} m={5}>
                    <Flex h={"100%"} justifyContent={"space-between"} direction={"column"} textAlign={"center"}>
                        <Text fontSize={"xl"} fontWeight={"bold"}>xNFTE Balance</Text>
                        <Skeleton isLoaded={!loadingStakeInfo && !loadingxNFTETokenBalance}>
                                {stakeInfo && stakeInfo[0] ? (
                                    <Box>
                                        <Text fontSize={"xl"} fontWeight={"bold"}>{ethers.utils.formatEther(stakeInfo[1])}</Text>
                                        <Text>{" $" + xNFTETokenBalance?.symbol}</Text>
                                    </Box>
                                ) : (
                                    <Text>0</Text>
                                )}
                            </Skeleton>
                        <Web3Button
                            contractAddress={FEE_DISTRIBUTOR_ADDRESS}
                            action={async (contract) => {
                                await contract.call(
                                    "claimRewards"
                                );
                                resetValue();
                            }}
                            onSuccess={() => toast({
                                title: "Rewards Claimed",
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                            })}
                        >Claim</Web3Button>
                    </Flex>
                </Card>
            </SimpleGrid>
        </Card>
    )
}