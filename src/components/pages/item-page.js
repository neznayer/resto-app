import React from "react";
import WithRestoService from "../hoc";
import { connect } from "react-redux";
import { menuLoaded, menuRequested, menuError } from "../../actions";
import Spinner from "../spinner";
import Error from "../error";

import "./item-page.css";

class ItemPage extends React.Component {
    componentDidMount() {
        const { RestoService } = this.props;
        RestoService.getMenuItems()
            .then((res) => this.props.menuLoaded(res))
            .catch(() => this.props.menuError());
    }

    render() {
        if (this.props.error) {
            return (
                <div className="item-page">
                    <Error />
                </div>
            );
        }

        if (this.props.loading) {
            return (
                <div className="item-page">
                    <Spinner />
                </div>
            );
        }

        const id = +this.props.match.params.id;
        const item = this.props.menuItems.find((el) => +el.id === id);
        const { title, category, price, url } = item;

        return (
            <div className="item-page">
                <div className="menu__item item-block">
                    <div className="menu-title">{title}</div>
                    <img className="menu__Img" src = {`${url}`} alt = {`${title}`}></img>
                    <div className="menu__price"> {price} </div>
                    <div className="menu__category"> {category} </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loagding: state.loading,
        error: state.error,
    };
};

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
};

export default WithRestoService()(
    connect(mapStateToProps, mapDispatchToProps)(ItemPage)
);
