import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import './menu-list.scss';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

class MenuList extends Component { // kogda tolko Mounted, On chitaet menu s Servera (RestoService), i zapisyvaet ih v state s pomoshyu action menuLoaded
    
    componentDidMount() {
        this.props.menuRequested();
        const {RestoService} = this.props; //vytaskivaem service iz props

        RestoService.getMenuItems() //poluchaem menu s servera
        .then(res => {this.props.menuLoaded(res);}) //poluchennoe menu zasovivaem v state
        .catch(() =>{this.props.menuError();}); 
    }

    render() {
        const {menuItems, loading, error, addedToCart} = this.props;
        
        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }

        const items = menuItems.map(menuItem => {
            return (<MenuListItem 
            key={menuItem.id} 
            menuItem={menuItem}
            onAddToCart={()=>addedToCart(menuItem.id)}/>)
        });

        return (
            <View items={items}/>
        )
        
        
    }
};

const mapState2Props = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error,
        items: state.items
    }
}

const mapDispatch2Props = {
        menuLoaded,
        menuRequested,
        menuError,
        addedToCart
}

const View = ({items})=> {
    return(
        <ul className="menu__list">
            {items}
        </ul>
    )
}

export default WithRestoService()(connect(mapState2Props,mapDispatch2Props)(MenuList));