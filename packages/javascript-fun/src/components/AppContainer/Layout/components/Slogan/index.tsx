import { FC } from 'react';

interface SloganProps {
  text: string;
}

const Slogan: FC<SloganProps> = ({ text }) => {
  if (!text) return null;
  return (
    <h1 className="m-0 px-1 py-0 text-white text-center uppercase bg-green-500">
      {text}
    </h1>
  );
};

export default Slogan;
