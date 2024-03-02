import { FC } from 'react';

interface LinkBoxProps {
  url: string;
  name: string;
  desc?: string;
}
const LinkBox: FC<LinkBoxProps> = ({ url, name, desc }) => (
  <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-dashed border-b-[1px] py-2">
    <h3 className="m-0">
      <a
        className="text-black hover:text-yellow-700 transition-colors duration-400"
        href={url}
        title={desc}
      >
        {name}
      </a>
    </h3>
  </div>
);

export default LinkBox;
