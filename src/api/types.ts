export type SignupRequest = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type SignupResponse = {
  id: number
}

export type SigninRequest = {
  login: string
  password: string
}

export type UserResponse = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  phone: string
  login: string
  avatar: string
  email: string
}

export type UserUpdateRequest = Omit<UserResponse, 'id' | 'avatar'>
export type UserChangePasswordRequest = {
  oldPassword: string
  newPassword: string
}

export type MessageFile = {
  id: number
  user_id: number
  path: string
  filename: string
  content_type: string
  content_size: number
  upload_date: string
}

export type MessageResponse = {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: MessageFile
}

type ChatLastMessage = {
  user: Pick<
    UserResponse,
    'first_name' | 'second_name' | 'avatar' | 'email' | 'login' | 'phone'
  >
  time: string
  content: string
}

export type ChatResponse = {
  id: number
  title: string
  avatar: string | null
  unread_count: number
  created_by: number
  last_message: ChatLastMessage | null
}

export type ChatUser = Pick<
  UserResponse,
  'id' | 'first_name' | 'second_name' | 'display_name' | 'login' | 'avatar'
> & { role: string }

export type ChatsRequest = {
  offset?: number
  limit?: number
  title?: string
}

export type ChatsResponse = ChatResponse[]

export type ChatDeleteResponse = {
  userId: number
  result: Pick<ChatResponse, 'id' | 'title' | 'avatar' | 'created_by'>
}

export type ChatUserResponse = ChatUser[]
