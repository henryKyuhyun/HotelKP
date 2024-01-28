import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import * as authActions from '../../../redux/authAction';
import {MenuIcon,
        SubMenu,
        MenuItem,
      } from './SidebarStyle';
import { resetLikes } from "../../../redux/slice/likeSlice"; 

export default function Sidebar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeMenus, setActiveMenus] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const userRole = useSelector((state) => state.auth?.userRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorage.getItem('loggedInUser');
      setLoggedInUser(JSON.parse(storedUser));
      
    } else {
      setLoggedInUser(null);
    }
  }, [isLoggedIn]);


  // 메뉴 활성화 상태를 토글하는 함수
  const toggleMenu = (index) => {
    if (activeMenus.includes(index)) {
      setActiveMenus(activeMenus.filter((i) => i !== index));
    } else {
      setActiveMenus([...activeMenus, index]);
    }
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(resetLikes());
    navigate("/");
  };


  return (
    <div>
      <MenuItem>
        {
          [
            {
              name: 'My메뉴',
              subMenuItems: [
                ...(isLoggedIn ? [{ name: '로그아웃', func: handleLogout }, { name: '마이페이지', url: '/mypage' }] 
                              : [{ name: '로그인', url: '/login' }, { name: '회원가입', url: '/join' }]),
                ...(isLoggedIn && userRole === 'hotel_admin' ? [{ name: '호텔 등록', url: '/uploadHotel' }] : []),
              ],
            },
          ].map((menuItem, index) => (
            <li key={index}>
              <button
                fold={activeMenus.includes(index)}
                className={activeMenus.includes(index) ? 'active' : ''}
                onClick={() => toggleMenu(index)}
              >
                <MenuIcon />
              </button>
              {activeMenus.includes(index) && (
                <SubMenu> 
                  {menuItem.subMenuItems.map((subMenuItem, subIndex) => (
                    <li key={`${index}-${subIndex}`}>
                      {subMenuItem.url 
                        ? <Link to={subMenuItem.url}>{subMenuItem.name}</Link>
                        : <button onClick={subMenuItem.func}>{subMenuItem.name}</button>
                      }
                    </li>
                  ))}
                </SubMenu>
              )}
            </li>
          ))
        }
      </MenuItem>
    </div>
  );
}