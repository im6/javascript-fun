import { FC } from 'react';

interface DisqusProps {
  iconCdnUrl: string;
}

const BackToTop: FC<DisqusProps> = ({ iconCdnUrl }) => (
  <div
    id="scrollToTopBtn"
    className="fixed bottom-20 right-0 md:right-10 h-10 w-10 opacity-0 invisible text-center rounded-l md:rounded-md bg-current transition duration-300 hover:bg-green-300 cursor-pointer"
  >
    <img
      src={`${iconCdnUrl}/fa-chevron-up.svg`}
      className="inline-block w-5 h-5 mt-1"
      alt="back to top"
    />
  </div>
);

export default BackToTop;
