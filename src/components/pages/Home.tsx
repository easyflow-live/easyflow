import React from 'react';
import { Title } from 'react-head';
import { observer } from 'mobx-react-lite';
import { Box } from '@chakra-ui/react';

import Heading from 'components/shared/Heading';
import Boards from 'modules/Dashboard';
import { useSession } from 'hooks/use-session';

const Home = () => {
  const { userDoc } = useSession();

  return (
    <>
      <Title>Boards | Easy Flow</Title>

      <Box m={6}>
        {userDoc ? (
          <>
            <Heading text={'Boards'} />
            <Boards boards={userDoc.boards} />
          </>
        ) : null}
      </Box>
    </>
  );
};

export default observer(Home);
