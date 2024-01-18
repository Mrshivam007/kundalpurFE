import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Topbar() {
  return (
    <>
      <div className="main_top_header">
        <div className="main_top_header_inear_icons">
          <EmailIcon style={{ width: '12px' }} />
          <p>badebaba.kundalpur@gmail.com</p>
        </div>
        <div>
          <FacebookIcon /> <InstagramIcon /> <YouTubeIcon />
        </div>
      </div>
    </>
  );
}

export default Topbar;
