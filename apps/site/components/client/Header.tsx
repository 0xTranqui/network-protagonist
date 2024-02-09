import { Button, Flex, Stack, Typography } from '@/design-system'
import { RiverLogo } from '@/server'
import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import { useParams } from 'next/navigation'

import { useEffect } from 'react'
import { getUserId } from 'gql/requests'
import { Hex } from 'viem'
import Link from 'next/link'

export function Header() {
  
  return (
    <Flex className='border-[1px] border-blue-500 w-fit'>
      <Link href={"/"}>
        <Typography>
          networkprotagoni.st
        </Typography>      
      </Link>
    </Flex>
  )



  // const { ready, login, authenticated } = usePrivy()
  // const { embeddedWallet, userId, username } = useUserContext()

  // async function userCheck(embeddedWalletAddress: Hex | undefined) {
  //   let fetchedUserId
  //   let fetchedUsername;
  //   if (embeddedWalletAddress) {
  //     fetchedUserId = await getUserId({
  //       custodyAddress: embeddedWallet?.address as Hex,
  //     })      
  //   }
  //   if (fetchedUserId?.userId) {
  //     fetchedUsername = await getUsername({
  //       id: BigInt(fetchedUserId.userId),
  //     })           
  //   }
  //   return {
  //     userId: fetchedUserId?.userId ? fetchedUserId?.userId : null,
  //     username: fetchedUsername ? fetchedUsername: null
  //   }
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // fetch userId + username values. 
  //     // will return null for userId or username if no address included, or no id/username found
  //     const { userId, username } = await userCheck(embeddedWallet?.address as Hex);
  //     // if no wallet address detected, dialog should be false
  //     if (!embeddedWallet?.address) {
  //       setOpen(false)
  //     } else {
  //       // if user is logged in with email, and has valid userId + username, dont show dialog
  //       if (userId && username) {
  //         setOpen(false);
  //       } else {
  //         // show dialog when a user is logged in, and either userId or username is false
  //         setOpen(true);
  //       }        
  //     }
  //   };
  //   fetchData();
  // }, [embeddedWallet, userId, username])

  const params = useParams()

  return (
    <div className="fixed z-50 w-screen">
    </div>
  )
}
