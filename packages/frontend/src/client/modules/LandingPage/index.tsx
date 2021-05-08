import React from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import { Box, Flex, Text, Link } from '@chakra-ui/react'

import { BoardAndProcess } from './BoardAndProcess'
import Header from './Header'

const items = ['Simple.', 'Beautiful.', 'Darker.', 'Open source.']

export function LandingPage() {
  return (
    <main>
      <Head>
        <title>Easy Flow</title>
      </Head>

      <Header />

      <Box width="full">
        <Box mx="auto" px={6} pt={12} pv={15} style={{ maxWidth: '1280px' }}>
          <Box display={{ base: 'block', xl: 'flex' }} mx="-6">
            <Box
              px={6}
              textAlign={{ base: 'left', xl: 'left', md: 'center' }}
              maxWidth={{ base: '2xl', md: '3xl' }}
              mx="auto"
            >
              <Text
                fontSize={{
                  base: '4xl',
                  xl: '4xl',
                  sm: '4xl',
                  md: '5xl',
                }}
                color="white"
                fontWeight="light"
              >
                {items.map((item) => (
                  <Text key={item} display="inline-block" mr="2">
                    {item}
                  </Text>
                ))}
                <Text color="teal.500" fontWeight="normal" display="block">
                  Everything a project manager should be.
                </Text>
              </Text>
              <Box>
                <Text
                  mt={6}
                  fontSize={{ sm: 'lg', md: 'xl', xl: 'lg' }}
                  color="gray.500"
                >
                  Easy Flow is a{' '}
                  <Text as="span" color="teal.500">
                    real time
                  </Text>{' '}
                  collaborative project manager based on Kanban methodology. We
                  make everything easier so you and your team can focus on
                  complete tasks and ship great products.
                </Text>
                <Flex
                  mt={6}
                  justifyContent={{
                    base: 'start',
                    md: 'center',
                    xl: 'start',
                  }}
                >
                  <NextLink href="/api/auth/signin" passHref>
                    <Link>Login</Link>
                  </NextLink>
                </Flex>
              </Box>
            </Box>
            <Flex
              mt={{ base: 20, xl: 0 }}
              px={6}
              shrink={0}
              justifyContent="center"
              display={{ base: 'none', md: 'flex' }}
            >
              <BoardAndProcess />
            </Flex>
          </Box>
        </Box>
      </Box>
    </main>
  )
}
