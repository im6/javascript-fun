import React, { Fragment } from 'react';
import purecssBase from 'css-loader!purecss/build/base-min.css';
import purecss0 from 'css-loader!purecss/build/buttons-min.css';
import purecss1 from 'css-loader!purecss/build/grids-min.css';
import purecss2 from 'css-loader!purecss/build/grids-responsive-min.css';
import typedCss from 'css-loader!./Layout/components/Sidebar/typed.css';

const CriticalCss = () => (
  <Fragment>
    <style dangerouslySetInnerHTML={{ __html: purecssBase }} />
    <style dangerouslySetInnerHTML={{ __html: purecss0 }} />
    <style dangerouslySetInnerHTML={{ __html: purecss1 }} />
    <style dangerouslySetInnerHTML={{ __html: purecss2 }} />
    <style dangerouslySetInnerHTML={{ __html: typedCss }} />
  </Fragment>
);

CriticalCss.propTypes = {};

export default CriticalCss;
