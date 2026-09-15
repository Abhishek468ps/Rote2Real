export const loadScript = (src: string, id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById(id)) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
