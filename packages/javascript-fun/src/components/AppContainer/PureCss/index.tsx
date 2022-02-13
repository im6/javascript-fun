import { FC } from 'react';
import purecss0 from 'css-loader!purecss/build/buttons-min.css';
import purecss1 from 'css-loader!purecss/build/grids-min.css';
import purecss2 from 'css-loader!purecss/build/grids-responsive-min.css';

const PureCss: FC = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `${purecss0}\n${purecss1}\n${purecss2}\n`,
    }}
  />
);

export default PureCss;
