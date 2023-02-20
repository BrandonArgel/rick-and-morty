import React from "react";

const lazyLoading = (ref: React.RefObject<HTMLImageElement>) => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target as HTMLImageElement;
      const src = img.getAttribute("data-src") as string;
      img.setAttribute("src", src);

      img.onload = () => {
        img.classList.add("show")
        img.parentElement?.classList.remove("skeleton");
      }

      // img.onerror = () => {
      //   img.setAttribute("src", "https://rickandmortyapi.com/api/character/avatar/1.jpeg");
      // }

      observer.unobserve(img);
    });
  });
  observer.observe(ref.current as HTMLImageElement);
};

export { lazyLoading };