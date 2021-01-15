import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import NewModal from './NewModal'

const Nav = ({ navItem, setNavItem, setToken, setRole }) => {
    // const [navItem, setNavItem] = useState('home')
    // const [modalOpen, setModalOpen] = useState(false)
    const isLoggedIn = false





    const handleNavClick = (event, { name }) => {
        // event.preventDefault()
        // let theValue = event.target.value
        console.log("name", name)
        // console.log("theValue", theValue)
        setNavItem(name)


    }


    // const handleSignIn = () => {
    //     console.log("you clicked sign in")
    //     setSignInModal(true)
    // }


    return (
        <Menu secondary>
            <Menu.Item
                name='home'
                active={navItem === 'home'}
                value="home"
                onClick={handleNavClick}
            />
            {isLoggedIn ?
                <>
                    <Menu.Item
                        name='orders'
                        active={navItem === 'orders'}
                        value={"orders"}
                        onClick={handleNavClick}
                    />   <Menu.Item
                        name='sign out'
                        active={navItem === 'sign out'}
                        value={"sign out"}
                        onClick={handleNavClick}
                    /> </> :
                <>
                    <Menu.Item >
                        <NewModal setToken={setToken} setRole={setRole} />
                        {/* // name='sign in'
                        // active={navItem === 'sign in'}
                        // value={"sign in"}
                        // onClick={handleSignIn} */}
                    </Menu.Item>
                    <Menu.Item
                        name='register'
                        active={navItem === 'register'}
                        value={"register"}
                        onClick={handleNavClick}
                    /></>}

            <Menu.Item
                name='cart'
                active={navItem === 'cart'}
                value={"cart"}
                onClick={handleNavClick}
            />

        </Menu>
    )
}

export default Nav