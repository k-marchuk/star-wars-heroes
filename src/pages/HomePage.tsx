import { Link } from 'react-router-dom';
import image from '@/img/Yoda.webp';

export const HomePage = () => {
  return (
    <div className="text-center flex flex-col items-center pt-20">
      <img src={image} alt="Star wars yoda" width="250" />
      <h1 className="text-balance font-semibold tracking-tight text-yellow sm:text-4xl md:text-5xl lg:text-7xl mt-20">
        May the Force be with you!
      </h1>

      <p className="mt-8 font-medium text-yellow sm:text-lg md:text-xl lg:text-3xl">
        Are you ready to embark on a journey through the galaxy far, far away?
        <br></br>Discover the legendary characters, powerful ships, and
        mysterious planets.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          role="link"
          to="/people"
          className="hover:text-white text-2xl shimmer font-bold leading-6 text-yellow hover:animate-pulse"
        >
          Let's go! <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
};
