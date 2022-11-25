export type CreateChatRequestType = {
  title: string
};

export type DeleteChatRequestType = {
  id: number
};

export type GetChatResponseType = {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      email: string,
      login: string,
      phone: string
    },
    time: string,
    content: string
  } | null
};

export type GetChatsResponseType = GetChatResponseType[];

export type GetGhatsTokenRequestType = {
  id: number
};

export type EditUsersInChatRequestType = {
  users: number[],
  chatId: number
};
