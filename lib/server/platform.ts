export async function getSignMessageRequest(walletAddress: `0x${string}`): Promise<{ signingMessage: string }> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/platform/web3-sign/request?walletAddress=${walletAddress}`,
    );
    const data = await res.json();
    console.log({ data });
    return data;
  } catch (e) {
    throw new Error('Failed to get sign message request');
  }
}

export async function verifySignature(signature: string, walletAddress: `0x${string}`) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/platform/web3-sign/verify`, {
      method: 'POST',
      body: JSON.stringify({
        signature,
        walletAddress,
      }),
    });
    const response = await res.json();
    return response;
  } catch (e) {
    throw new Error('Failed to verify signature');
  }
}
