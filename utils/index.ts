export const getDomain = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://discover-coffee-stores.vercel.app';
  } else {
    return 'http://localhost:3000';
  }
}