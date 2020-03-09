import React, {useEffect, useState} from 'react';

function Navigation(props) {

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        let student_modules = await fetch("/api/students/220").then(res => res.json());
        setItems(student_modules);
    };
    return (<div id="sideMenu">
        <div className="has-text-centered">
            <div>
                <h1 className="title is-3 ">University of Springfield</h1>
            </div>
        </div>
        <figure className="image is-96x96">
            <i className="material-icons">face</i>
        </figure>
        <div className="has-text-centered">
            <div>
                <h2 className="heading">{items.forename} {items.surname}</h2>
            </div>
        </div>
        <div className="has-text-centered">
            <div>
                <span className="tag is-info">STAGE {items.stage}</span>
            </div>
        </div>

        <aside className="menu">

            <ul className="menu-list">
                <li>
              <span className="icon has-text-info">
                <i className="material-icons">apps</i>
              </span>
                    <a href="/modules">Modules</a>
                </li>
                <li>
              <span className="icon has-text-info">
                <i className="material-icons">account_circle</i>
              </span>
                    <a href="/profile">Profile</a>
                </li>
                <li>
              <span className="icon has-text-info">
                <i className="material-icons">show_chart</i>
              </span>
                    <a href="/stats">Stats</a>
                </li>
            </ul>

            <ul className="menu-list">
                <li>
               <span className="icon has-text-info">
                  <i className="material-icons">power_settings_new</i>
                </span>
                    <a href="/logout" className="modal-button" data-target="#log-in-reg" aria-haspopup="true">Logout</a>
                </li>
            </ul>
        </aside>
        <footer className="footer">
            <div className="has-text-centered">
                <h6>Copyright © University of Springfield</h6>
            </div>
        </footer>
    </div>);
}

export default Navigation;