import React from 'react';

export default class Ad extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
      <div className='ad'>
        <ins className='adsbygoogle'
          google_ad_client="ca-pub-2362481387707104"
          enable_page_level_ads="true" />
      </div>
    );
  }
}
