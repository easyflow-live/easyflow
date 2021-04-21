import ContentLoader from 'react-content-loader';

const CardPlaceholder = () => (
  <ContentLoader
    speed={1}
    primaryColor='#cecece'
    secondaryColor='#ecebeb'
    style={{
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      padding: '5px',
      borderRadius: '4px',
    }}
  >
    <rect x='0' y='17' rx='4' ry='4' width='350' height='13' />
    <rect x='0' y='40' rx='3' ry='3' width='250' height='10' />
    <rect x='0' y='60' rx='4' ry='4' width='290' height='13' />
    <circle cx='20' cy='100' r='20' />
    <circle cx='70' cy='100' r='20' />
  </ContentLoader>
);

export default CardPlaceholder;
