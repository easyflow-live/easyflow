import { Box, Text } from '@chakra-ui/layout'
import Link from 'next/link'

const Header = () => (
  <Box width="full">
    <Box width="full" mx="auto" style={{ maxWidth: '1280px' }} p={6}>
      <Box width={{ lg: '' }} className="lg:w-1/4 xl:w-1/5 pl-6 pr-6">
        <Link href="/">
          <a>
            <Text fontSize="2xl" color="white">
              <Text as="span" color="teal.500">
                easy
              </Text>
              flow
            </Text>
          </a>
        </Link>
      </Box>
    </Box>
  </Box>
)

export default Header
