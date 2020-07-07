type InviteEmail = {
  to: string;
  userName: string;
  userEmail: string;
  ownerName: string;
  boardName: string;
  boardUrl: string;
  inviteId: string;
};

export const sendInviteEmail = async (body: InviteEmail) => {
  return (
    await fetch('/api/invite', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  ).json();
};
