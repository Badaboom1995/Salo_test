/* eslint-disable no-template-curly-in-string */
import React from 'react'
import allDay from './assets/all-day.svg'
import morning from './assets/sunrise.svg'
import afternoon from './assets/sun.svg'
import evening from './assets/moon.svg'
import group from './assets/group.svg'
import statistics from './assets/statistics.svg'
import guide from './assets/guidebook.svg'
import trash from './assets/trash.svg'
import check from './assets/check-box.svg'
import { UserOutlined, BellOutlined } from '@ant-design/icons'
import { logOut } from 'shared/core/user/duck/actions'

import { NavButton } from './view/NavButton'
import { selectAll, selectGroup, selectByTime } from './selectors'
import { Navigation as Wrapper, NavList, NavItem } from './styled'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibilityFilter } from './duck/slices/filters'
import Buddy from 'features/Buddy'
import { Space, Typography, Avatar, Menu, Dropdown } from 'antd'

import { RootState } from 'index'

const { Text } = Typography
type NavigationProps = {}

const Navigation = (props: NavigationProps) => {
  const dispatch = useDispatch()
  const userProfile = useSelector((state: RootState) => state.user.profile)
  const habits = useSelector(selectAll)

  const eveningHabits = useSelector(selectByTime('evening'))
  const afternoonHabits = useSelector(selectByTime('afternoon'))
  const morningHabits = useSelector(selectByTime('morning'))
  const groupHabits = useSelector(selectGroup)

  const filterItems = [
    {
      name: 'All',
      count: habits,
      icon: allDay,
      filter: 'SHOW_ALL',
    },
    {
      name: 'Morning',
      count: morningHabits,
      icon: morning,
      filter: 'SHOW_MORNING',
    },
    {
      name: 'Afternoon',
      count: afternoonHabits,
      icon: afternoon,
      filter: 'SHOW_AFTERNOON',
    },
    {
      name: 'Evening',
      count: eveningHabits,
      icon: evening,
      filter: 'SHOW_EVENING',
    },
    {
      name: 'Group',
      count: groupHabits,
      icon: group,
      filter: 'SHOW_GROUP',
    },
  ]

  const profileMenu = (
    <Menu style={{ width: '150px' }}>
      <Menu.Item
        onClick={() => {
          dispatch(logOut())
        }}
        style={{ padding: '10px' }}
      >
        Log out
      </Menu.Item>
    </Menu>
  )

  const getNavItems = model =>
    model.map(item => {
      return (
        <NavItem key={item.name}>
          <NavButton
            onClick={() => {
              item.filter && dispatch(setVisibilityFilter(item.filter))
            }}
            to={`/dashboard/${item.name.charAt(0).toLowerCase() + item.name.slice(1)}`}
            icon={item.icon}
            counter={item.count.length}
          >
            {item.name}
          </NavButton>
        </NavItem>
      )
    })

  return (
    <Wrapper>
      <Dropdown overlay={profileMenu} placement="bottomLeft" arrow>
        <Space align="center" style={{ marginBottom: '10px', marginTop: '10px' }}>
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{ marginLeft: '11px', marginRight: '5px', cursor: 'pointer' }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: '14px',
              marginBottom: '0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              maxWidth: '100px',
            }}
          >
            {userProfile && userProfile.email}
          </Text>
          <BellOutlined
            style={{
              marginLeft: '51px',
              display: 'block',
              cursor: 'pointer',
              color: '#fff',
              fontSize: '16px',
            }}
          />
        </Space>
      </Dropdown>
      <NavList>{getNavItems(filterItems)}</NavList>
      <NavList>
        <NavItem>
          <NavButton to="/statistics" icon={statistics}>
            Statistics
          </NavButton>
        </NavItem>
        <NavItem>
          <NavButton to="/plan" icon={guide}>
            Guide
          </NavButton>
        </NavItem>
      </NavList>
      <NavList>
        <NavItem>
          <NavButton to="/completed" icon={check}>
            Completed
          </NavButton>
        </NavItem>
        <NavItem>
          <NavButton to="/trash" icon={trash}>
            Trash
          </NavButton>
        </NavItem>
      </NavList>
      <Buddy></Buddy>
    </Wrapper>
  )
}

export default Navigation
