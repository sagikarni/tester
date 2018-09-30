const connectWith = (vendor: string, url: string) =>
  new Promise((resolve, reject) => {
    const listener = (e: any) => {
      const { message, accessToken, refreshToken, payload } = e.data;
      if (message === vendor + 'Login') {
        window.removeEventListener('message', listener, false);
        resolve({ accessToken, refreshToken, payload });
      }
    };

    window.addEventListener('message', listener, false);
    window.open(url, vendor, 'height=585, width=770');
  });


export { connectWith };
