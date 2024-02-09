import { Flex } from '@/design-system'

export default function BaseLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return (
    <section>
      <Flex className="px-5 ">
        <div className="w-full md:w-[78%]">{children}</div>
      </Flex>
    </section>
  )
}
