import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('UA-141378639-1');
};

export const logPageView = url => {
  ReactGA.set({ page: url });
  ReactGA.pageview(url);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
