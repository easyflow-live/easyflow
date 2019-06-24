import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const AvatarLoader = ({ style, ...props }: IContentLoaderProps) => (
  <ContentLoader
    style={{ width: '40', height: '40', ...style }} // I dont now why, but only works with both
    height={40}
    width={40}
    speed={2}
    primaryColor='#cecece'
    secondaryColor='#fff'
    {...props}
  >
    <circle cx='20' cy='20' r='20' width='40' height='40' />
  </ContentLoader>
);

export default AvatarLoader;
