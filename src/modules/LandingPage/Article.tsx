import cn from 'classnames';

import AnimateSlideUpinView from 'components/Animated/AnimateSlideUpinView';
import styles from './Article.module.css';

type Size = 'small' | 'large';

interface ArticleProps {
  reverse?: boolean;
  srcImg: string;
  altImg?: string;
  sizeImg?: Size;
  title: string;
  description?: string;
  subtitle?: string;
}

const Article = ({
  reverse,
  srcImg,
  altImg,
  sizeImg,
  title,
  description,
  subtitle,
}: ArticleProps) => {
  const marginBetween = reverse
    ? 'sm:mr-0 md:mr-10 lg:mr-24'
    : 'sm:ml-0 md:ml-10 lg:ml-24';

  const imageSize = sizeImg === 'small' ? 'md:w-1/2' : 'md:w-3/5';
  const contentSize = sizeImg === 'small' ? 'md:w-1/2' : 'md:w-2/5'; // small img, bigger content

  return (
    <article
      className={cn(
        styles.Article,
        'flex w-full items-start flex-col sm:flex-col md:flex-row'
      )}
    >
      <AnimateSlideUpinView className={`sm:w-full ${imageSize}`}>
        <img
          className={cn(
            styles.print,
            'rounded-lg object-cover mx-auto md:mx-0'
          )}
          src={srcImg}
          alt={altImg}
        />
      </AnimateSlideUpinView>
      <AnimateSlideUpinView
        className={`flex-initial mt-16 sm:w-full md:mt-0 ${contentSize} ${marginBetween} ${
          reverse ? 'md:order-first' : ''
        }`}
      >
        <>
          <p className='flex-grow text-teal-200 mb-4'>{subtitle}</p>
          <h3 className='flex-grow text-white text-4xl mb-4'>{title}</h3>
          <p className='text-2xl text-teal-200 text-gray-100'>{description}</p>
        </>
      </AnimateSlideUpinView>{' '}
    </article>
  );
};

export default Article;
