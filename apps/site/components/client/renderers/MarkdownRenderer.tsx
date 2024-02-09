'use client'

import React, { useEffect, useState } from 'react'
import Editor from 'rich-markdown-editor'
import { light as customTheme } from '../../../styles/editorTheme'
import { fragmentMono } from 'app/fonts/fonts'

type Props = {
  contentUrl: string
}

const MarkdownRenderer: React.FC<Props> = ({ contentUrl }) => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch(contentUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then((data) => {
        setContent(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching Markdown content:', error)
        setIsLoading(false)
      })
  }, [contentUrl])

  return (
    <div className="flex h-fit justify-center md:h-full">
      <div
        className="flex h-fit md:h-full w-full justify-center"
        // style={{ height: '90vh', maxWidth: '55vw' }}
      >
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Editor
            className={`${fragmentMono.variable} w-[400px]`}
            style={{ fontFamily: fragmentMono.variable }}
            // disableExtensions={['container_notice']}
            value={content}
            readOnly
            theme={customTheme}
          />
        )}
      </div>
    </div>
  )
}

export default MarkdownRenderer