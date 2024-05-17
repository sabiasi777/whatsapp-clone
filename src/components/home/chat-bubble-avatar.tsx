import { IMessage } from '@/store/chat-store'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react'
import { AvatarFallback } from '../ui/avatar';

type ChatBubbleAvatarProps = {
    message: IMessage;
    isMember: boolean;
    isGroup: boolean | undefined
}

const ChatBubbleAvatar = ({isGroup,isMember,message}:ChatBubbleAvatarProps) => {
    if(!isGroup) return null
  return (
    <Avatar>
        {message.sender.isOnline && isMember && (
            <div className='absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 birder-foreground'></div>
        )}
        <AvatarImage src={message.sender.image} className='rounded-full object-cover w-8 h-8' />
        <AvatarFallback>

        </AvatarFallback>
    </Avatar>
  )
}

export default ChatBubbleAvatar
