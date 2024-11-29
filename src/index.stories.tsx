import type { Meta, ReactRenderer, StoryObj } from '@storybook/react'
import Index from './index'
import { StoryAnnotations } from 'storybook/internal/types'

const meta = {
  component: Index,
  title: 'PDF Editor'
} satisfies Meta<typeof Index>

export default meta

type Story = StoryObj<typeof meta> &
  StoryAnnotations<
    ReactRenderer,
    { initialPage?: number | ((totalPages: number) => number) | undefined; file: string; fileName: string },
    { initialPage?: number | ((totalPages: number) => number) | undefined; file: string; fileName: string }
  >

export const Default: Story = {
  args: {
    file: 'https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK',
    fileName: 'dummy.pdf',
    onSave(file, name) {
      console.log(file, name)
    }
  }
}
