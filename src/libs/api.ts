type InviteEmail = {
  to: string;
  userName: string;
  userEmail: string;
  ownerName: string;
  boardName: string;
  boardUrl: string;
  inviteId: string;
};

export const sendInviteEmail = (body: InviteEmail) => {
  return fetch('/api/invite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
