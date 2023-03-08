import React from "react";
import imgError from "assets/images/error.jpg";

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
      };

      img.onerror = () => {
        img.parentElement?.classList.remove("skeleton");
        img.src = imgError;
      };

      observer.unobserve(img);
    });
  });
  observer.observe(ref.current as HTMLImageElement);
};

export { lazyLoading };