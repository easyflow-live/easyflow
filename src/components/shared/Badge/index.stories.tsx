import Badge from '.';

export default { title: 'Atomos/Badge', component: Badge };

export const basic = () => (
  <Badge className='bg-pink-500' title='feature'>
    Feature
  </Badge>
);
