
import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'

type Address = `0x${string}` | undefined;

const useBurnNft = () => {
    const [tokenId, setTokenId] = useState<Address>();
    const [contract, setContract] = useState<Address>();
    const [burnError, setBurnError] = useState<any>();
    const [connectionError, setConnectionError] = useState<any>();
    const [thxHash, setThxHash] = useState<any>();
    
    const MetaMask = new MetaMaskConnector({
        options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
        },
    });

    const { address } = useAccount();
    const { connect } = useConnect({
        connector: MetaMask,
        onError(error: any) {
        if (error?.cause?.code === -32002) {
            setConnectionError('Request already pending!');
        } else if (error?.message === 'Connector not found') {
            setConnectionError(
            'Connector not found! Please install MetaMask extension.'
            );
        } else {
            setConnectionError(`${error.message}`);
        }
        },
    });

    const burnNft = (data: any) => {
        if (!address) {
            connect();
        } else {
            setTokenId(data.TokenId);
            setContract(data.Contract);
        }
    };

    const { config } = usePrepareContractWrite({
        address: contract,
        abi: [
        {
            name: 'safeTransferFrom',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address' 
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            }
            ],
            outputs: [],
        },
        ],
        functionName: 'safeTransferFrom',
        args: [address, '0x7db72AacEd2d9D58669F95dAF057b62cF17B502f', tokenId],
        enabled: Boolean(tokenId) && Boolean(address) && Boolean(contract),
    });

    const { data, error, isError, write } = useContractWrite(config);
    const { isLoading } = useWaitForTransaction({
        hash: data?.hash
    });

    useEffect(() => {
        if (error) {
            setBurnError(error);
        }

        setContract(undefined);
        setTokenId(undefined);
        }, [error, isError]
    );

    useEffect(() => {
        if (data) {
            setThxHash(data.hash);
        }
        
        setContract(undefined);
        setTokenId(undefined);
        }, [isLoading]
    );

    useEffect(() => {
        if (tokenId && contract && write) {
            write();
        }
        }, [tokenId, contract]
    );

    return { burnNft, address, burnError, connectionError, thxHash };
};

export default useBurnNft;