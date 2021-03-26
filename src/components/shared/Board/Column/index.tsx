import { Box, BoxProps, forwardRef } from 'components/design';
import { CSSProperties } from 'react';

interface ColumnProps extends BoxProps {
  columns?: number;
  style?: CSSProperties;
}

const Column = forwardRef<ColumnProps, 'ul'>(
  ({ children, columns = 1, ...props }, ref) => (
    <Box
      display='grid'
      as='ul'
      ref={ref}
      gridAutoRows='max-content'
      boxSizing='border-box'
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      gridGap='2.5'
      minWidth='300px'
      height='full'
      maxHeight='80vh'
      overflowY='auto'
      minHeight='200px'
      rounded='lg'
      p='5'
      bg='gray.700'
      _after={{
        content: '""',
        height: '10px',
        gridColumnStart: `span ${columns}`,
      }}
      {...props}
    >
      {children}
    </Box>
  )
);

export default Column;
