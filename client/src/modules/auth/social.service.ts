const connectWith = (vendor: string, url: string) =>
  new Promise((resolve, reject) => {
    const listener = (e: any) => {
      const { message, access_token, payload } = e.data;
      if (message === vendor + 'Login') {
        window.removeEventListener('message', listener, false);
        resolve({ token: access_token, payload });
      }
    };

    window.addEventListener('message', listener, false);
    window.open(url, vendor, 'height=585, width=770');
  });


export { connectWith };
