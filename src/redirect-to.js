import Router from 'next/router';

export const redirectTo = ({ destination, status, ctx }) => {
  if (ctx && ctx.req && ctx.res) {
    ctx.res.writeHead(status || 301, {
      Location: destination,
    });
    ctx.res.end();
  } else {
    if (destination[0] === '/' && destination[1] !== '/') {
      Router.push(destination);
    } else {
      // @ts-ignore
      window.location = destination;
    }
  }
};
