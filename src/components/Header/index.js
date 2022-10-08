import React, { useEffect } from 'react';
import './header.css';
import flipkartLogo from '../../images/logo/flipkart.png';
import goldenStar from '../../images/logo/golden-star.png';
import { IoIosCart, IoIosSearch, IoIosArrowDown } from 'react-icons/io';

const Header = () => {

  // useEffect(() => {
  //   const header = document.getElementById("header");
  //   const mobHeader = document.getElementById("mobHeader");
  //   const sticky = header.offsetTop;
  //   const mobSticky = mobHeader.offsetTop;
  //   const onScroll = () => {
  //     if (window.pageYOffset > sticky || window.pageXOffset > mobSticky) {
  //       // header.classList.add("sticky");
  //       mobHeader.classList.add("sticky");
  //     } else {
  //       // header.classList.remove("sticky");
  //       mobHeader.classList.add("sticky");
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   }
  // }, []);

  return (
    <>
      <div className="header sticky" id="header">
        <div className="logo">
          <a href="/">
            <img src={flipkartLogo} className="logoimage" title="flipkartlogo" alt="flipkart" width={75} height={20} />
          </a>
          <a href="/" className="underline">
            <span className="exploreText">
              Explore
            </span>
            <span className="plusText">
              Plus
            </span>
            <img src={goldenStar} className="goldenStar" title="star" alt="star" width={20} height={20} />
          </a>
        </div>
        <div className='searchContainer'>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'Search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{ color: '#156EF4', fontSize: '20px', strokeWidth: '25px' }} />
            </div>
          </div>
        </div>
        <div className="login">
          <a href="/" className="loginButton">
            Login
          </a>
        </div>
        <div className='moreContainer'>
          <a href="/" className="more">
            <span>
              More
            </span>
            <IoIosArrowDown />
          </a>
        </div>
        <div className='cartContainer'>
          <a href="/" className="cart">
            <IoIosCart style={{ fontSize: '18px', strokeWidth: '25px' }} />
            <span style={{ margin: '2px 6px 0px 6px' }}>
              Cart
            </span>
          </a>
        </div>
      </div>
      <div className="mobHeader sticky" id="mobHeader">
        <div className='subDiv'>
          <div className="logo">
            <a href="/">
              <img src={flipkartLogo} className="logoimage" title="flipkartlogo" alt="flipkart" width={75} height={20} />
            </a>
            <a href="/" className="underline">
              <span className="exploreText">
                Explore
              </span>
              <span className="plusText">
                Plus
              </span>
              <img src={goldenStar} className="goldenStar" title="star" alt="star" width={20} height={20} />
            </a>
          </div>
          <div className='subDivTwo'>
            <div className='cartContainer'>
              <a href="/" className="cart" aria-label='cart'>
                <IoIosCart style={{ fontSize: '18px', strokeWidth: '25px' }} />
              </a>
            </div>
            <div className="login">
              <a href="/" className="loginButton">
                Login
              </a>
            </div>
          </div>
        </div>
        <div className='searchContainer'>
          <div className="searchInputContainer">
            <div className="searchIconContainer">
              <IoIosSearch style={{ color: '#156EF4', fontSize: '20px', strokeWidth: '25px' }} />
            </div>
            <input
              className="searchInput"
              placeholder={'Search for products, brands and more'}
            />
          </div>
        </div>
      </div>
    </>
  )
};

export default Header;