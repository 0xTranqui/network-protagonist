import { SubmitButton } from '@/client'
import { useUserContext } from '@/context'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Separator,
  Stack,
  Toast,
  Typography,
} from '@/design-system'
import {
  type UsernameSchemaValues,
  checkUsernameAvailability,
  processRegisterFor,
  usernameSchema,
  signForUsername,
} from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import debounce from 'debounce'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Hex } from 'viem'

interface UsernameDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function UsernameDialog({ open, setOpen }: UsernameDialogProps) {
  const form = useForm<UsernameSchemaValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  })

  const { signMessage, embeddedWallet, fetchUserData } = useUserContext()

  const [usernameExists, setUsernameExists] = useState(false)
  const [validationComplete, setValidationComplete] = useState(false)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)

  // Subscribe to changes to the username input
  const watchUsername = debounce(() => form.watch('username'), 500)

  const triggerValidation = React.useMemo(
    () =>
      debounce(() => {
        form.trigger('username')
        setValidationComplete(true)
      }, 500),
    [form],
  )

  useEffect(() => {
    if (form.formState.isValid && validationComplete) {
      checkUsernameAvailability(form.getValues().username).then((result) => {
        setUsernameExists(result.exists)
        setIsCheckingAvailability(false)
      })
      return () => {
        setValidationComplete(false)
      }
    }
  }, [validationComplete, watchUsername])

  async function registerUsername({ username }: { username: string }) {
    if (signMessage && embeddedWallet?.address && fetchUserData) {
      const userId = await processRegisterFor({
        privySignerAddress: embeddedWallet.address,
        privySignMessage: signMessage,
        username: `${username}`,
      })
  
      if (userId) {
        const success = await signForUsername({
          userId: String(userId),
          username: username,
          registerForRecipient: embeddedWallet.address as Hex,
          privySignMessage: signMessage,
        })
  
        if (success) {
          await fetchUserData()
          return true // Indicate success
        } else {
          console.error('Failed to prepare and set username.')
          // Handle failure here
          return false
        }
      } else {
        console.log('User ID not obtained from processRegisterFor.')
        return false // Indicate failure to obtain userId
      }
    } else {
      console.log('Required conditions not met for registerUsername.')
      return false // Indicate failure due to unmet conditions
    }
  }
  

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <Stack className="items-center gap-5">
          <DialogTitle>
            <Typography>Choose a username</Typography>
          </DialogTitle>
          <Form {...form}>
            <form
              action={async () => {
                const userId = await registerUsername({
                  username: form.getValues().username,
                })

                if (userId === undefined) {
                  throw new Error('User ID is undefined')
                }

                if (!signMessage) {
                  throw new Error('signMessage is undefined')
                }

                // Close the dialog
                setOpen(false)
                // Render a toast
                toast.custom((t) => (
                  <Toast>
                    Welcome to River{' '}
                    <span className="font-bold">
                      {form.getValues().username}
                    </span>
                  </Toast>
                ))
              }}
              className="w-full"
            >
              <Stack className="gap-8">
                <Separator />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mx-5 text-center">
                      <FormControl>
                        <Input
                          placeholder="Enter username..."
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            setIsCheckingAvailability(true)
                            triggerValidation()
                          }}
                        />
                      </FormControl>
                      <div className="h-3">
                        {usernameExists ? (
                          <FormMessage className="pt-2 text-red-500">
                            Username not available, please try another
                          </FormMessage>
                        ) : (
                          <FormMessage className="pt-2 text-red-500" />
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                <Separator className="-mt-3" />
              </Stack>
              <DialogFooter className="text-center pt-[18px]">
                <SubmitButton
                  type="submit"
                  variant="link"
                  disabled={
                    !form.formState.isValid ||
                    usernameExists ||
                    isCheckingAvailability
                  }
                >
                  Complete
                </SubmitButton>
              </DialogFooter>
            </form>
          </Form>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
