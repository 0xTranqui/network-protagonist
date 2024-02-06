import { ChannelDialog, User, UsernameDialog } from '@/client'
import { Button, Flex, Typography } from '@/design-system'
import { RiverLogo } from '@/server'
import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useUserContext } from 'context/UserContext'
import { useEffect } from 'react'
import { getUserId } from 'gql/requests'
import { Hex } from 'viem'
import { getUsername } from 'lib/username'

export function Header() {
  const [open, setOpen] = useState<boolean>(false)
  const { ready, login, authenticated } = usePrivy()
  const { embeddedWallet, userId, username } = useUserContext()

  console.log("userId", userId)
  console.log("embeddedWallet", embeddedWallet)
  console.log("username", username)

  async function userCheck(embeddedWalletAddress: Hex | undefined) {
    let fetchedUserId
    let fetchedUsername;
    if (embeddedWalletAddress) {
      fetchedUserId = await getUserId({
        custodyAddress: embeddedWallet?.address as Hex,
      })      
    }
    if (fetchedUserId?.userId) {
      fetchedUsername = await getUsername({
        id: BigInt(fetchedUserId.userId),
      })           
    }
    return {
      userId: fetchedUserId?.userId ? fetchedUserId?.userId : null,
      username: fetchedUsername ? fetchedUsername: null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      // fetch userId + username values. 
      // will return null for userId or username if no adderss included, or no id/username found
      const { userId, username } = await userCheck(embeddedWallet?.address as Hex);
      // if no wallet address detected, dialog shoul dbe false
      if (!embeddedWallet?.address) {
        setOpen(false)
      } else {
        // if user is logged in with email, and has valid userId + username, dont show dialog
        if (userId && username) {
          setOpen(false);
        } else {
          // show dialog when a user is logged in, and either userId or username is false
          setOpen(true);
        }        
      }
    };
    fetchData();
  }, [embeddedWallet, userId, username])

  const params = useParams()

  return (
    <div className="bg-popover fixed z-50 w-screen">
      {/* Header */}
      <Flex
        className={`py-3 px-5 items-center justify-between border-b border-border ${
          params.index ? '' : 'md:border-none'
        }`}
      >
        <RiverLogo />
        {/* If the `PrivyProvider` is loading, display only the River logo */}
        {!ready ? (
          <></>
        ) : (
          <Flex className="gap-x-5">
            <ChannelDialog authenticated={authenticated} login={login} />
            {authenticated ? (
              <User setOpen={setOpen} />
            ) : (
              <Button variant="link" onClick={login}>
                <Typography>Login</Typography>
              </Button>
            )}
          </Flex>
        )}
      </Flex>
      <UsernameDialog open={open} setOpen={setOpen} />
    </div>
  )
}
