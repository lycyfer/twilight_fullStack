import "./layout.css";

import { Outlet } from "react-router-dom";

import Logo from "../../components/logo/logo";

function Layout() {
    return (
        <div className="layout">
            <div >
                <Logo />
                {/* <div className="support">ТехМаша
                    <div className='support-block'>
                        +7-777-777-77-77
                    </div>
                </div> */}

            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}



export { Layout };
